"""
Comprehensive documentation for the transcribe_audio.py script.

This module provides batch transcription of Russian audio files using OpenAI's Whisper model.
The script processes all audio files in the .audio-inputs directory and outputs transcriptions
to .audio-outputs/transcription.txt with organized formatting.

Features:
- Recursive audio file discovery with multiple format support
- Batch processing with progress tracking and timing
- Configurable Whisper models and device selection
- Robust error handling and logging
- UTF-8 output with organized file structure

Usage:
    python scripts/transcribe/transcribe_audio.py [options]

Examples:
    # Basic usage with default settings
    python scripts/transcribe/transcribe_audio.py

    # Use larger model with GPU acceleration
    python scripts/transcribe/transcribe_audio.py --model base --device cuda

    # Verbose logging with append mode
    python scripts/transcribe/transcribe_audio.py --verbose --append

Supported Audio Formats:
    .wav, .mp3, .flac, .ogg, .m4a

Output Format:
    ### relative/path/to/audio.mp3
    Transcribed text content here

    ### another/audio/file.wav
    More transcribed content

Dependencies:
    - openai-whisper>=20230314: Speech-to-text transcription engine
    - ffmpeg-python>=0.2.0: Audio file processing and format conversion
    - numpy>=1.23.0: Numerical computations for audio processing
    - torch>=2.0.0: Machine learning backend for Whisper models

Requirements:
    - Python 3.8 or higher
    - ffmpeg installed and available in PATH
    - Sufficient disk space for model downloads (first run)
    - Audio files placed in .audio-inputs/ directory

Directory Structure:
    .audio-inputs/          # Input audio files (any supported format)
    .audio-outputs/         # Output directory for transcriptions
    ├── transcription.txt   # Main output file with all transcriptions

Performance Notes:
    - First run downloads Whisper models (~150MB-3GB depending on model size)
    - GPU acceleration available with CUDA-compatible hardware
    - Larger models provide better accuracy but slower processing
    - Processing time varies: ~1-5x real-time depending on model and hardware

Model Sizes (accuracy vs speed):
    - tiny: Fastest, basic accuracy (~39MB)
    - base: Good balance (~74MB)
    - small: Better accuracy (~244MB) [DEFAULT]
    - medium: High accuracy (~769MB)
    - large: Best accuracy (~1550MB)

Error Handling:
    - Missing input directory: Creates helpful error message
    - No audio files found: Graceful exit with warning
    - Individual file errors: Logged but don't stop batch processing
    - Model loading failures: Immediate exit with error details
    - Unhandled exceptions: Full stack trace logging

Logging Levels:
    - INFO (default): Progress updates and completion status
    - DEBUG (--verbose): Detailed processing information and file paths
    - ERROR: Critical failures and individual file processing errors
    - WARNING: Non-critical issues like empty directories

Exit Codes:
    0: Success - all files processed successfully
    1: Critical error - Python installation, model loading, or directory issues
    0: No files to process (with warning message)
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

    # Check input directory exists
    if not INPUT_DIR.exists():
        logging.error(f"Input directory '{INPUT_DIR}' does not exist. Please create it and add audio files.")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    if OUTPUT_FILE.exists() and not args.append:
        OUTPUT_FILE.unlink()

    audio_files = find_audio_files(INPUT_DIR)
    if not audio_files:
        logging.warning(f'No audio files found in {INPUT_DIR}. Ensure your files have supported extensions: {AUDIO_EXTENSIONS}')
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
