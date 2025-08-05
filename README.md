# Recipe-Book 🍳

A comprehensive system for converting Russian audio recipes into structured JSON data and beautiful web presentations.

## Features

- 🎤 **Audio Transcription**: Convert Russian speech to text using OpenAI Whisper
- 🤖 **AI-Powered Structuring**: Transform unstructured text into standardized recipe JSON
- 📁 **Organized Data**: Clean, searchable recipe database
- 🌐 **React Frontend**: Beautiful recipe book interface
- 🔍 **Search & Tags**: Filter recipes by title or custom tags in real time

## Quick Start

### 1. Setup Environment

```powershell
# Clone repository
git clone https://github.com/georgeparkdev/Recipe-Book
cd Recipe-Book

# Run setup script (Windows)
.\setup.ps1

# Activate virtual environment (if needed to transcribe audio files first)
.\venv\Scripts\Activate.ps1
```

### 2. Add Recipes

#### Option A: From Audio Files

1. Place audio files in `.audio-inputs/` folder
2. Run transcription:
   ```powershell
   python scripts\transcribe\transcribe_audio.py --model small --language ru
   ```
3. Use AI prompt (see below) to convert unstructured text to JSON

#### Option B: From Text

1. Use the AI prompt directly with your recipe text
2. Skip the transcription step

### 3. Convert to Structured Data

1. Copy the prompt from `.github/prompts/convert-text-to-recipe-ru.prompt.md`
2. Replace placeholder with the recipe text from `.audio-outputs/transcription.txt`
3. Submit to any AI (ChatGPT, Claude, etc.)
4. Save the returned JSON to `data/recipes/recipe-name.json`

## Project Structure

```
Recipe-Book/
├── 📁 .audio-inputs/         # Audio files (create this folder)
├── 📁 .audio-outputs/        # Transcription results
├── 📁 data/recipes/          # Structured recipe JSON files
├── 📁 scripts/transcribe/    # Audio processing tools
├── 📁 docs/                  # Documentation
├── 📁 react/                 # Web application
├── 📄 setup.ps1             # Environment setup
└── 📄 requirements.txt      # Python dependencies
```

## Supported Audio Formats

- `.wav` - Uncompressed audio (best quality)
- `.mp3` - Compressed audio (most common)
- `.flac` - Lossless compression
- `.ogg` - Open source format
- `.m4a` - Apple audio format

## Examples

### Transcription Command Options

```powershell
# Basic usage (recommended)
python scripts\transcribe\transcribe_audio.py

# High accuracy with GPU
python scripts\transcribe\transcribe_audio.py --model base --device cuda

# Verbose output for debugging
python scripts\transcribe\transcribe_audio.py --verbose

# Append to existing transcription
python scripts\transcribe\transcribe_audio.py --append
```

### Recipe JSON Structure

```json
{
  "title": "Паста со сливочно-сырным соусом и креветками",
  "yield": "На 2 порции",
  "ingredients": [
    {
      "quantity": 300,
      "unit": "г",
      "item": "сливки",
      "descriptor": null,
      "optional": false
    }
  ],
  "equipment": ["кастрюля", "сотейник", "сковорода"],
  "steps": [
    {
      "number": 1,
      "action": "Разморозьте креветки в холодной воде",
      "duration_seconds": null,
      "temperature_celsius": null,
      "notes": null
    }
  ],
  "dietary_tags": [],
  "custom_tags": ["ужин", "быстро"],
  "source": null
}
```

## Requirements

- **Python 3.8+** - Core runtime
- **PowerShell** - For Windows setup scripts
- **ffmpeg** - Audio processing (recommended)
- **Internet connection** - For downloading AI models (first run)

## Documentation

- 📖 [Development Guide](docs/DEVELOPMENT.md) - Technical details and architecture
- 🔄 [Workflow Guide](docs/WORKFLOW.md) - Step-by-step process for adding recipes
- 🎯 [AI Prompts](.github/prompts/) - Templates for recipe conversion

## Troubleshooting

### Common Issues

**"Input directory does not exist"**

```powershell
# Create the folder and add audio files
mkdir .audio-inputs
# Add your .mp3, .wav, etc. files here
```

**"Python not found"**

- Install Python 3.8+ from [python.org](https://python.org)
- Ensure Python is added to your PATH

**"ffmpeg not found"**

- Download from [ffmpeg.org](https://ffmpeg.org/download.html)
- Add to system PATH (optional but recommended)
- Or install via winget:
```powershell
winget install ffmpeg
```

**Virtual environment issues**

```powershell
# Recreate the environment
.\setup.ps1 -Force
```

### Performance Tips

- **GPU Acceleration**: Use `--device cuda` with NVIDIA GPU
- **Model Selection**: Balance speed vs accuracy
  - `tiny` - Fastest, basic accuracy
  - `small` - Good balance (default)
  - `base` - Better accuracy
  - `large` - Best accuracy, slowest
- **Batch Processing**: Process multiple files automatically

## Development

### Setup for Contributors

```powershell
# Install development dependencies
pip install -r requirements.txt

# Run with verbose logging
python scripts\transcribe\transcribe_audio.py --verbose

# Check code style
flake8 scripts/
```

### Project Goals

- ✅ Audio transcription system
- ✅ AI-powered recipe structuring
- ✅ Comprehensive documentation
- 🔄 React web application (in progress)
 - ✅ Recipe search and filtering
- 🔮 Image support
- 🔮 Export functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with sample audio files
5. Submit a pull request

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

**Ready to digitize your recipe collection? Run `.\setup.ps1` to get started! 🚀**
