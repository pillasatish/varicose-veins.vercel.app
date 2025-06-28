# VenoScan - AI Varicose Vein Analysis

A simple Streamlit application for AI-powered varicose vein detection and staging from leg images.

## Features

- 🖼️ Easy image upload interface
- 🤖 AI-powered analysis using OpenAI's GPT-4 Vision
- 📊 Probability assessment and stage classification
- 🩺 Medical-grade diagnostic reasoning
- 📱 Responsive web interface

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure OpenAI API Key:**
   - Create a `.streamlit/secrets.toml` file
   - Add your OpenAI API key:
     ```toml
     OPENAI_API_KEY = "your-openai-api-key-here"
     ```

3. **Run the application:**
   ```bash
   streamlit run app.py
   ```

## Deployment

### Streamlit Cloud
1. Push your code to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect your GitHub repository
4. Add your OpenAI API key in the Streamlit Cloud secrets

### Other Platforms
- **Heroku**: Add a `Procfile` with `web: streamlit run app.py --server.port=$PORT`
- **Railway**: Works out of the box with the requirements.txt
- **Render**: Use the Python environment with build command `pip install -r requirements.txt`

## Usage

1. Upload a clear image of a leg showing potential varicose veins
2. Click "Start Analysis" to begin AI analysis
3. Review the probability assessment and stage classification
4. Read the medical reasoning provided by the AI

## Varicose Vein Stages

- **Stage 1**: Spider veins (thin, web-like veins)
- **Stage 2**: Reticular veins (1-3mm, blue/green)
- **Stage 3**: Varicose veins (≥3mm, bulging, rope-like)
- **Stage 4**: Skin changes (pigmentation, eczema)
- **Stage 5**: Ulcers (open, non-healing wounds)

## Disclaimer

This application is for educational and informational purposes only. It should not replace professional medical consultation. Always consult with healthcare providers for proper diagnosis and treatment.

## License

MIT License - feel free to use and modify as needed.