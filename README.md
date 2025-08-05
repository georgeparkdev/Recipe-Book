<div align="center">
  <img src="assets/logo.png" alt="Recipe-Book Logo" width="120" style="margin-bottom:1em;" />
</div>

# Recipe-Book 🍳

## Overview

Recipe-Book is a project for managing and viewing recipes, with support for adding new recipes from audio files using AI transcription and JSON generation.

## Workflow: Adding Recipes from Audio Files

1. **(Optional) Place Audio Files**

   - Put your audio files (e.g., `.mp3`, `.wav`) into a folder such as `audio-inputs/` (create this folder if it does not exist).

2. **(Optional) Transcribe Audio to Text**

   - Run the provided Python script to transcribe audio files to text. See the script's documentation for all parameters.
   - **Key parameters:**
     - `--model` Whisper model size (default: small). Options: tiny, base, small, medium, large
     - `--device` Device to use: cpu or cuda (default: cpu)
     - `--language` Transcription language (default: ru)
     - `--append` Append to existing output file (default: False)
     - `--verbose` Enable verbose logging (default: False)
   - **Example usage (small model, Russian language):**
     ```powershell
     python scripts/transcribe/transcribe_audio.py --model small --language ru
     ```
   - This will generate text files in the `.audio-outputs/` folder.
   - _You may also use any preferred AI transcription tool or service._

3. **Generate Recipe JSON with AI**

   - Use an AI (such as ChatGPT, Copilot, or any LLM) to convert the transcribed text into a recipe JSON file.
   - **For Russian recipes, see the detailed prompt:**
     [.github/prompts/convert-text-to-recipe-ru.prompt.md](.github/prompts/convert-text-to-recipe-ru.prompt.md)
   - Review the generated JSON for correctness and consistency with existing recipes.

4. **Add JSON to the App**
   - Place the new JSON file into `react-app/src/data/recipes/`.
   - The new recipe will be available in the app after the next build or reload.

## Contributing

- Ensure new recipes follow the structure of existing JSON files in `react-app/src/data/recipes/`.
- Validate your JSON before adding it to avoid runtime errors.

---

For more details, see the code and scripts in the repository.
