"""
transcribe_audio.py: Batch transcribe Russian audio files using openai-whisper.

Usage example:
    python transcribe_audio.py --model tiny

Quick-start test procedure:
1. Place Russian audio files (.wav, .mp3, .flac, .ogg, .m4a) in the .audio-inputs/ directory.
2. Install dependencies: pip install -r requirements.txt
3. Run: python transcribe_audio.py
4. Check .audio-outputs/transcription.txt for results.
"""

# requirements.txt
# openai-whisper>=20230314
# ffmpeg-python>=0.2.0
# numpy>=1.23.0
# torch>=2.0.0

import argparse
import logging
import sys
import time
from pathlib import Path
from typing import List, Optional

import whisper

AUDIO_EXTENSIONS = {'.wav', '.mp3', '.flac', '.ogg', '.m4a'}
INPUT_DIR = Path('.audio-inputs')
OUTPUT_DIR = Path('.audio-outputs')
OUTPUT_FILE = OUTPUT_DIR / 'transcription.txt'


def find_audio_files(directory: Path) -> List[Path]:
    """Recursively find all audio files in directory, sorted alphabetically by relative path."""
    files = [p for p in directory.rglob('*') if p.suffix.lower() in AUDIO_EXTENSIONS and p.is_file()]
    return sorted(files, key=lambda p: p.relative_to(directory).as_posix())


def load_whisper_model(model_size: str, device: str) -> whisper.Whisper:
    """Load and cache the Whisper model."""
    try:
        model = whisper.load_model(model_size, device=device)
        return model
    except Exception as e:
        logging.error(f"Failed to load Whisper model: {e}")
        sys.exit(1)


def transcribe_file(model: whisper.Whisper, audio_path: Path, language: str, verbose: bool = False) -> str:
    """Transcribe a single audio file to text using Whisper."""
    abs_path = audio_path.resolve()
    if not abs_path.exists():
        logging.error(f"File does not exist: {abs_path}")
        return f"[ERROR: File does not exist: {abs_path}]"
    logging.debug(f"Transcribing file at: {abs_path}")
    try:
        result = model.transcribe(str(abs_path), language=language, verbose=verbose)
        return result['text'].strip()
    except Exception as e:
        logging.error(f"Transcription failed for {abs_path}: {e}")
        return f"[ERROR: {e}]"


def write_transcription(output_path: Path, rel_path: Path, text: str, append: bool) -> None:
    """Write a single transcription block to the output file."""
    mode = 'a' if append and output_path.exists() else 'w'
    with output_path.open(mode, encoding='utf-8') as f:
        f.write(f"### {rel_path.as_posix()}\n{text}\n\n")


def main():
    parser = argparse.ArgumentParser(description="Batch transcribe Russian audio files using openai-whisper.")
    parser.add_argument('--model', default='small', help='Whisper model size (default: small)')
    parser.add_argument('--device', default='cpu', choices=['cpu', 'cuda'], help='Device to use (cpu or cuda)')
    parser.add_argument('--language', default='ru', help='Transcription language (default: ru)')
    parser.add_argument('--append', action='store_true', help='Append to existing output file')
    parser.add_argument('--verbose', action='store_true', help='Enable verbose logging')
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format='%(asctime)s %(levelname)s %(message)s',
        handlers=[logging.StreamHandler(sys.stdout)]
    )

    logging.info('Starting batch transcription')
    start_time = time.time()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    if OUTPUT_FILE.exists() and not args.append:
        OUTPUT_FILE.unlink()

    audio_files = find_audio_files(INPUT_DIR)
    if not audio_files:
        logging.warning(f'No audio files found in {INPUT_DIR}')
        sys.exit(0)

    model = load_whisper_model(args.model, args.device)

    for idx, audio_path in enumerate(audio_files, 1):
        rel_path = audio_path.relative_to(INPUT_DIR)
        logging.info(f'[{idx}/{len(audio_files)}] Processing {rel_path}')
        file_start = time.time()
        text = transcribe_file(model, audio_path, args.language, args.verbose)
        write_transcription(OUTPUT_FILE, rel_path, text, append=True)
        logging.info(f'Finished {rel_path} in {time.time() - file_start:.1f}s')

    logging.info(f'All files processed in {time.time() - start_time:.1f}s')

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logging.exception(f'Unhandled exception: {e}')
        sys.exit(1)
