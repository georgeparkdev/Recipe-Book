# Recipe book

This project provides a script to batch-transcribe Russian audio files using the open-source [openai-whisper](https://github.com/openai/whisper) ASR engine.

## Prerequisites

- Python 3.12
- [ffmpeg](https://ffmpeg.org/) installed and available in your system PATH

## Installation

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Preparing Audio Files

- Place your Russian audio files (`.wav`, `.mp3`, `.flac`, `.ogg`, `.m4a`) in the `.audio-inputs/` directory (create it if it doesn't exist).
- Files can be in subfolders; all will be discovered recursively.

## Usage

Basic usage:

```bash
python transcribe_audio.py
```

### Command-Line Options

- `--model` Whisper model size (default: `small`). E.g., `tiny`, `base`, `small`, `medium`, `large`.
- `--device` Device to use: `cpu` or `cuda` (default: `cpu`).
- `--language` Language code (default: `ru` for Russian).
- `--append` Append to existing output file instead of overwriting.
- `--verbose` Enable detailed progress logs.

Example:

```bash
python transcribe_audio.py --model small --device cpu --language ru --verbose
```

## Output

- Transcriptions are saved to `.audio-outputs/transcription.txt`.
- Each block is formatted as:

  ```
  ### relative/path/to/file.ext
  <transcribed text>

  ```

## Quick-Start Test Procedure

1. Place Russian audio files in `.audio-inputs/`.
2. Install dependencies: `pip install -r requirements.txt`
3. **Install FFmpeg (required for Whisper to process audio):**
   - On Windows, the easiest way is with [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/):
     ```powershell
     winget install ffmpeg
     ```
   - Or download from https://ffmpeg.org/download.html and add ffmpeg/bin to your PATH.
4. Run: `python transcribe_audio.py`
5. Check `.audio-outputs/transcription.txt` for results.

## Notes

- The script will automatically download the required Whisper model on first run.
- If you want to keep previous transcriptions, use the `--append` flag.
- For best performance on large batches, use a CUDA-enabled GPU and set `--device cuda`.
