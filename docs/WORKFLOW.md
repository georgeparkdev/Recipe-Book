# Recipe-Book Workflow Guide

This guide explains the complete workflow for adding recipes to the Recipe-Book system.

## Overview

The Recipe-Book system converts Russian audio recordings into structured recipe data through a two-step AI-assisted process:

1. **Audio → Text**: Automatic transcription using Whisper AI
2. **Text → JSON**: Structured data extraction using LLM prompts

## Step-by-Step Workflow

### Step 1: Preparation

1. **Audio Recording**

   - Record recipe instructions in Russian
   - Use clear speech and good audio quality
   - Include ingredients, quantities, cooking steps, and timing
   - Save as `.wav`, `.mp3`, `.flac`, `.ogg`, or `.m4a`

2. **Environment Setup**

   ```powershell
   # Run setup script (first time only)
   .\setup.ps1

   # Activate virtual environment
   .\venv\Scripts\Activate.ps1
   ```

### Step 2: Audio Transcription (Optional)

> **Note**: Skip this step if you already have text recipes

1. **Place Audio Files**

   ```
   .audio-inputs/
   └── dessert-recipe.ogg
   ```

2. **Run Transcription**

   ```powershell
   # Basic transcription
   python scripts\transcribe\transcribe_audio.py

   # With custom options
   python scripts\transcribe\transcribe_audio.py --model base --verbose
   ```

3. **Review Output**
   - Check `.audio-outputs/transcription.txt`
   - Verify text accuracy
   - Make manual corrections if needed

### Step 3: Text to Structured Recipe (AI-Assisted)

1. **Prepare the Prompt**

   - Open `.github/prompts/convert-text-to-recipe-ru.prompt.md`
   - Copy the entire prompt content

2. **Replace Placeholder Text**

   ```markdown
   <<BEGIN_RECIPE>>
   {{ВСТАВЬТЕ ОРИГИНАЛЬНЫЙ НЕСТРУКТУРИРОВАННЫЙ ТЕКСТ РЕЦЕПТА (РУССКИЙ ЯЗЫК)}}
   <<END_RECIPE>>
   ```

   Replace the placeholder with your transcribed text or manual recipe text.

3. **Submit to AI**

   - Use ChatGPT, Claude, or any compatible LLM
   - Paste the complete prompt with your recipe text
   - Wait for structured JSON response

4. **Validate JSON Output**

   ```json
   {
     "title": "Паста со сливочно-сырным соусом и креветками",
     "yield": "На 2 порции",
     "ingredients": [
       {
         "quantity": null,
         "unit": null,
         "item": "макароны спагетти",
         "descriptor": "тонкие",
         "optional": false
       }
       // ... more ingredients
     ],
     "equipment": ["кастрюля", "сотейник", "сковорода"],
     "total_time_seconds": null,
    "steps": [
      {
        "number": 1,
        "action": "Разморозьте креветки в холодной воде",
        "duration_seconds": null,
        "temperature_celsius": null,
        "notes": null
      }
      // ... more steps
    ],
    "dietary_tags": [],
    "custom_tags": ["ужин", "быстро"],
    "source": null
  }
  ```

5. **Save Recipe File**
   - Create filename using kebab-case: `pasta-with-creamy-cheese-sauce-and-shrimp.json`
   - Save to `data/recipes/` directory
   - Ensure UTF-8 encoding

### Step 4: Quality Control

1. **Validate JSON Syntax**

   - Use JSON validator or IDE with JSON support
   - Ensure proper encoding (UTF-8)
   - Check for trailing commas or syntax errors

2. **Review Content**

   - Verify ingredient quantities and units
   - Check cooking steps are in logical order
   - Ensure Russian text is preserved correctly
   - Include relevant custom tags or use an empty array
   - Validate equipment list is complete

3. **Test with Future React App**
   - JSON files will be automatically discovered
   - No additional configuration needed

## Example Workflow

### Example: Converting Audio Recipe

1. **Audio File**: `pasta-krevetki.mp3` (Russian cooking instructions)

2. **Transcription**:

   ```
   Паста со сливочно-сырным соусом и креветками. Нам нужно макароны спагетти тонкие,
   сливки 300 грамм, креветки 10-14 штук очищенные разрезанные вдоль...
   ```

3. **AI Prompt**: Combined prompt with transcribed text

4. **JSON Output**: Structured recipe saved as `pasta-with-creamy-cheese-sauce-and-shrimp.json`

### Example: Manual Recipe Entry

1. **Source**: Written recipe from cookbook or website

2. **Direct AI Processing**: Use prompt with manual text input

3. **JSON Output**: Same structured format

## Tips and Best Practices

### Audio Recording Tips

- Record in quiet environment
- Speak clearly and at moderate pace
- Include all ingredients with quantities
- Mention cooking temperatures and timing
- Describe equipment needed

### AI Prompt Tips

- Include complete recipe text
- Don't edit the prompt structure
- Review AI output for accuracy
- Make corrections before saving JSON

### File Organization

- Use descriptive, kebab-case filenames
- Group similar recipes in subdirectories if needed
- Keep original audio files for reference
- Backup JSON files regularly

### Quality Assurance

- Double-check ingredient quantities
- Verify cooking temperatures are in Celsius
- Ensure step numbers are sequential
- Validate equipment list completeness

## Troubleshooting

### Common Issues

**Transcription Errors**

- Use higher quality audio
- Try different Whisper model sizes
- Manually correct text before AI processing

**AI JSON Errors**

- Check JSON syntax carefully
- Ensure all required fields are present
- Validate against schema

**Character Encoding**

- Save files as UTF-8
- Preserve Russian characters
- Avoid ASCII-only editors

### Getting Help

1. Check this workflow guide
2. Review `docs/DEVELOPMENT.md` for technical details
3. Examine existing JSON files in `data/recipes/` as examples
4. Validate JSON using online tools

---

_This workflow ensures consistent, high-quality recipe data for the Recipe-Book system._
