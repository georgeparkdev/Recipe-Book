# Prompt: Batch Transcribe Russian Audio Files (Python 3.12)

## Objective

Generate a production-ready **Python 3.12** script (`transcribe_audio.py`) that consolidates the speech content of every audio file located in the **`.audio-inputs/`** directory into a single UTF-8 plain-text file named **`transcription.txt`** inside **`.audio-outputs/`**.

## Functional Requirements

1. **Discovery** – Recursively enumerate all common audio formats (`.wav`, `.mp3`, `.flac`, `.ogg`, `.m4a`) found under `.audio-inputs/`, preserving alphabetical order by relative path.
2. **Speech-to-Text** – For each file, perform Russian-language transcription using an open-source ASR engine such as `openai-whisper`, `faster-whisper`, or `vosk` (no paid API keys).
3. **Aggregation** – Append each transcription to `transcription.txt` using the following template:

   ```
   ### {relative_path}
   {transcribed text}
   ```

4. **Output Handling** – Create the `.audio-outputs/` folder if it does not exist; overwrite any pre-existing `transcription.txt` unless `--append` is supplied.
5. **CLI** – Provide command-line options:

   - `--model` (default `small`) – pre-trained model size.
   - `--device` (`cpu`/`cuda`)
   - `--language` (default `ru`)
   - `--append` flag to preserve existing output file.
   - `--verbose` for progress logs.

6. **Logging & Errors** – Emit structured logs indicating start/end, per-file processing, duration, and error details. Exit with non-zero status on unhandled exceptions.

## Non-Functional Requirements

- **Compatibility** – Must run under Python 3.12; avoid deprecated APIs.
- **Performance** – Stream or chunk audio to minimise RAM usage; leverage GPU automatically when available.
- **Code Quality** – Full type hints, PEP-8 compliant, modular functions, and meaningful docstrings.
- **Dependencies** – List all third-party packages in an inline `requirements.txt` comment block.
- **Self-Contained** – Auto-download model weights on first run. No placeholders—provide concrete, runnable code.
- **Cross-Platform** – Support Linux, macOS, and Windows path semantics.

## Deliverables

1. `transcribe_audio.py` – the executable script.
2. In-script usage example:

   ```bash
   python transcribe_audio.py --model tiny
   ```

3. Footer section outlining quick-start test procedure.

## Acceptance Criteria

Executing the script with default parameters against a repository containing Russian audio files in `.audio-inputs/` **must** result in `.audio-outputs/transcription.txt` whose contents include correctly transcribed Russian text blocks for every input file.

---

**Authoring Guidance for Copilot**

- Write idiomatic, maintainable Python.
- Prefer `Pathlib` over `os.path`.
- Use `argparse` for CLI and `logging` for structured output.
- Encapsulate model loading in a separate function that caches the model instance.
- Include unit-testable helper functions.
- Wrap top-level logic in `if __name__ == "__main__":` guard.

---

_End of prompt_
