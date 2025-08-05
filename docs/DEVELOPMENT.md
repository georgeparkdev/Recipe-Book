# Recipe-Book Development Guide

## Project Overview

Recipe-Book is a comprehensive system for converting audio recordings of Russian recipes into structured JSON data and displaying them in a beautiful React web application.

## Architecture

```
Recipe-Book/
├── 📁 .audio-inputs/          # Input audio files (gitignored)
├── 📁 .audio-outputs/         # Transcription outputs (gitignored)
├── 📁 data/recipes/           # Structured recipe JSON files
├── 📁 scripts/transcribe/     # Audio transcription utilities
├── 📁 react/                  # React web application (future)
├── 📁 .github/
│   ├── 📁 prompts/           # AI prompts for recipe conversion
│   └── 📁 instructions/      # Development instructions
├── 📄 setup.ps1              # Environment setup script
├── 📄 requirements.txt       # Python dependencies
└── 📄 README.md              # User documentation
```

## Workflow

### 1. Audio Transcription (Optional)

- Place Russian audio files in `.audio-inputs/`
- Run transcription script to convert speech to text
- Output saved to `.audio-outputs/transcription.txt`

### 2. Recipe Structuring (Optional)

- Use AI with `convert-text-to-recipe-ru.prompt.md`
- Input: Unstructured Russian text
- Output: Structured JSON following recipe schema
- Manually save JSON files to `data/recipes/`

### 3. Web Application (Future)

- React app will automatically read JSON files from `data/recipes/`
- Beautiful recipe book interface with search and filtering

## JSON Schema

All recipes follow this standardized structure:

```typescript
interface Recipe {
  title: string; // Recipe name
  yield: string; // e.g., "На 4 порции"
  ingredients: Ingredient[]; // Ingredient list
  equipment: string[]; // Required equipment
  total_time_seconds: number | null; // Total cooking time
  steps: Step[]; // Cooking instructions
  dietary_tags: string[]; // Diet restrictions (if any)
  custom_tags: string[]; // User-defined tags
  source: string | null; // Original source
}

interface Ingredient {
  quantity: number | string | null; // Amount (ranges as strings)
  unit: string | null; // г, мл, ст.л., etc.
  item: string; // Ingredient name
  descriptor: string | null; // Preparation notes
  optional: boolean; // Whether ingredient is optional
}

interface Step {
  number: number; // Step number (1-based)
  action: string; // What to do (imperative)
  duration_seconds: number | null; // Step duration
  temperature_celsius: number | null; // Temperature if specified
  notes: string | null; // Additional tips
}
```

## Development Environment

### Requirements

- Python 3.8+
- PowerShell (Windows)
- ffmpeg (recommended for audio processing)

### Setup

```powershell
# Clone and navigate to repository
git clone <repository-url>
cd Recipe-Book

# Run setup script
.\setup.ps1

# Activate virtual environment
.\venv\Scripts\Activate.ps1
```

### Dependencies

- `openai-whisper` - Speech-to-text transcription
- `ffmpeg-python` - Audio file processing
- `torch` - Machine learning backend
- `numpy` - Numerical computations

## Usage Examples

### Transcribe Audio Files

```powershell
# Basic transcription
python scripts\transcribe\transcribe_audio.py

# With custom settings
python scripts\transcribe\transcribe_audio.py --model base --device cuda --language ru --verbose

# Append to existing output
python scripts\transcribe\transcribe_audio.py --append
```

### Available Models

- `tiny` - Fastest, least accurate
- `base` - Good balance
- `small` - Better accuracy (default)
- `medium` - High accuracy
- `large` - Best accuracy, slowest

## AI Prompt Usage

1. Copy transcribed text from `.audio-outputs/transcription.txt`
2. Use the prompt from `.github/prompts/convert-text-to-recipe-ru.prompt.md`
3. Replace `{{ВСТАВЬТЕ ОРИГИНАЛЬНЫЙ НЕСТРУКТУРИРОВАННЫЙ ТЕКСТ РЕЦЕПТА}}` with your text
4. Submit to AI (ChatGPT, Claude, etc.)
5. Save returned JSON to `data/recipes/recipe-name.json`

## Best Practices

### File Naming

- Recipe JSON: `kebab-case-recipe-name.json`
- Audio files: Any format supported by ffmpeg
- Use descriptive names that match the recipe title

### Audio Quality Tips

- Record in quiet environment
- Speak clearly and at moderate pace
- Use good quality microphone
- Supported formats: `.wav`, `.mp3`, `.flac`, `.ogg`, `.m4a`

### Recipe Validation

- Always validate JSON syntax before saving
- Use Russian text for ingredient names and actions
- Include measurements where possible
- Add equipment and timing information when available

## Troubleshooting

### Common Issues

**"Input directory does not exist"**

- Create `.audio-inputs/` folder and add audio files

**"Failed to load Whisper model"**

- Check internet connection (first run downloads models)
- Ensure sufficient disk space
- Try smaller model size

**"ffmpeg not found"**

- Install ffmpeg from https://ffmpeg.org/download.html
- Add to system PATH
- Restart terminal/PowerShell

**Python/Pip Issues**

- Ensure Python 3.8+ is installed
- Use virtual environment: `.\venv\Scripts\Activate.ps1`
- Update pip: `python -m pip install --upgrade pip`

### Performance Optimization

**GPU Acceleration**

```powershell
# Install PyTorch with CUDA support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Use GPU for transcription
python scripts\transcribe\transcribe_audio.py --device cuda
```

**Batch Processing**

- Process multiple audio files automatically
- Use `--verbose` to monitor progress
- Consider using smaller models for large batches

## Contributing

### Code Style

- Python: Follow PEP 8, use type hints
- PowerShell: Use approved verbs, proper error handling
- JSON: Validate against schema, use proper encoding

### Testing

- Test setup script on clean environment
- Validate transcription with sample audio
- Verify JSON schema compliance

### Documentation

- Update this guide when adding features
- Include examples for new functionality
- Maintain changelog for version updates

## Future Enhancements

- [ ] React web application development
 - [x] Recipe search and filtering
- [ ] Image support for recipes
- [ ] Export functionality (PDF, etc.)
- [ ] Multi-language support
- [ ] Recipe rating and comments
- [ ] Ingredient shopping lists
- [ ] Nutritional information calculation

---

_For questions or issues, please check the troubleshooting section or create an issue in the repository._
