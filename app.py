import streamlit as st
import requests
import base64
from PIL import Image
import io

# Page configuration
st.set_page_config(
    page_title="VenoScan - AI Varicose Vein Analysis",
    page_icon="🩺",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(90deg, #3b82f6, #06b6d4);
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        color: white;
        text-align: center;
    }
    
    .upload-section {
        background: #f8fafc;
        padding: 2rem;
        border-radius: 15px;
        border: 2px dashed #cbd5e1;
        text-align: center;
        margin: 1rem 0;
    }
    
    .analysis-result {
        background: #f0f9ff;
        padding: 1.5rem;
        border-radius: 10px;
        border-left: 4px solid #3b82f6;
        margin: 1rem 0;
    }
    
    .disclaimer {
        background: #fef3c7;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #f59e0b;
        margin-top: 1rem;
    }
    
    .guidelines {
        background: #ecfdf5;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid #10b981;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
<div class="main-header">
    <h1>🩺 VenoScan</h1>
    <p>AI-Powered Varicose Vein Analysis</p>
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'analysis_result' not in st.session_state:
    st.session_state.analysis_result = None
if 'uploaded_image' not in st.session_state:
    st.session_state.uploaded_image = None

# Create two columns
col1, col2 = st.columns([1, 1])

with col1:
    st.markdown("### 📤 Upload Leg Image")
    
    # File uploader
    uploaded_file = st.file_uploader(
        "Choose an image file",
        type=['jpg', 'jpeg', 'png', 'webp'],
        help="Upload a clear image of the leg showing potential varicose veins"
    )
    
    if uploaded_file is not None:
        # Display the uploaded image
        image = Image.open(uploaded_file)
        st.image(image, caption="Uploaded Image", use_column_width=True)
        st.session_state.uploaded_image = uploaded_file
        
        # Analyze button
        if st.button("🔍 Start Analysis", type="primary", use_container_width=True):
            with st.spinner("Analyzing image for varicose veins..."):
                # Convert image to base64
                img_buffer = io.BytesIO()
                image.save(img_buffer, format='JPEG')
                img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
                
                # Call OpenAI API
                try:
                    api_key = st.secrets.get("OPENAI_API_KEY", "")
                    if not api_key:
                        st.error("OpenAI API key not configured. Please add it to your Streamlit secrets.")
                        st.stop()
                    
                    headers = {
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {api_key}"
                    }
                    
                    payload = {
                        "model": "gpt-4o-mini",
                        "messages": [
                            {
                                "role": "system",
                                "content": """[Identity]  
You are VenoScan, an expert AI diagnostic assistant with computer vision specialized in detecting and staging varicose veins from patient leg images.

[Style]  
• Maintain a calm, professional, and reassuring medical tone.  
• Use precise, concise language.  
• Avoid unnecessary commentary or medical jargon beyond what's required for clarity.

[Input]  
• A single high‑resolution image of the patient's leg or feet (front and/or side view).  

[Response Guidelines]  
• Output the **probability (0%–100%)** that the patient has varicose veins.  
• Then, identify the **stage** of progression (if any): Stage 1 to Stage 5 or "No Visible Signs".  
• Use step-by-step medical reasoning to justify your diagnosis (in maximum 5 lines).
  Start by identifying key visual indicators, then explain how they map to the staging criteria.
• Round the probability to the **nearest whole number**.  
• Raise an error if the image is unclear or if the leg is not visible.
• If legs are normal, respond with "No visible signs of venous disease" and a probability of 0%.

[Stages]  
• **Stage 1 – Spider Veins**: Thin red or green web-like veins on the skin (telangiectasia); cosmetic in nature.  
• **Stage 2 – Reticular Veins**: Veins 1–3 mm, possible leg heaviness or aching without prominent bulging; often blue/green.  
• **Stage 3 – Varicose Veins**: Bulging, rope-like veins ≥ 3mm; symptoms may include pain, swelling, itching, heaviness.  
• **Stage 4 – Skin Changes**: Pigmentation, eczema, lipodermatosclerosis, or atrophie blanche; indicates chronic venous insufficiency.  
• **Stage 5 – Ulcer**: Open, non-healing wounds (typically near ankles); may show skin fragility, scarring, or advanced tissue damage.  
• **No Visible Signs**: No visual indicators of venous disease.

[Example Response]  
Probability: 73%  
Stage: Stage 3 – Varicose Veins  
Rope-like, bulging veins >3mm seen along calf; likely source of reported swelling and heaviness."""
                            },
                            {
                                "role": "user",
                                "content": [
                                    {
                                        "type": "text",
                                        "text": "Please analyze this image for varicose veins."
                                    },
                                    {
                                        "type": "image_url",
                                        "image_url": {
                                            "url": f"data:image/jpeg;base64,{img_base64}"
                                        }
                                    }
                                ]
                            }
                        ],
                        "max_tokens": 500,
                        "temperature": 0.5
                    }
                    
                    response = requests.post(
                        "https://api.openai.com/v1/chat/completions",
                        headers=headers,
                        json=payload,
                        timeout=30
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        analysis = result['choices'][0]['message']['content']
                        st.session_state.analysis_result = analysis
                        st.success("Analysis completed!")
                    else:
                        st.error(f"API Error: {response.status_code} - {response.text}")
                        
                except Exception as e:
                    st.error(f"Error during analysis: {str(e)}")
    
    # Photo Guidelines
    st.markdown("""
    <div class="guidelines">
        <h4>📋 Photo Guidelines</h4>
        <ul>
            <li>Take clear, well-lit photos of the affected leg</li>
            <li>Include front and side views if possible</li>
            <li>Ensure the entire leg is visible</li>
            <li>Avoid blurry or dark images</li>
            <li>Remove any clothing that obscures the leg</li>
        </ul>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("### 📊 Analysis Results")
    
    if st.session_state.analysis_result:
        st.markdown(f"""
        <div class="analysis-result">
            <h4>✅ Analysis Complete</h4>
            <pre style="white-space: pre-wrap; font-family: monospace; background: white; padding: 1rem; border-radius: 5px; margin-top: 1rem;">{st.session_state.analysis_result}</pre>
        </div>
        """, unsafe_allow_html=True)
        
        # Disclaimer
        st.markdown("""
        <div class="disclaimer">
            <strong>⚠️ Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical consultation. Please consult with a healthcare provider for proper diagnosis and treatment.
        </div>
        """, unsafe_allow_html=True)
        
    else:
        st.markdown("""
        <div style="text-align: center; padding: 3rem; color: #64748b;">
            <h4>🔬 Ready for Analysis</h4>
            <p>Upload a leg image to get started with AI-powered varicose vein detection</p>
        </div>
        """, unsafe_allow_html=True)

# Sidebar with additional information
with st.sidebar:
    st.markdown("### About VenoScan")
    st.markdown("""
    VenoScan uses advanced AI to analyze leg images for signs of varicose veins and provides:
    
    - **Probability assessment** (0-100%)
    - **Stage classification** (1-5 or No Signs)
    - **Medical reasoning** for the diagnosis
    
    **Stages Overview:**
    - **Stage 1**: Spider veins (cosmetic)
    - **Stage 2**: Reticular veins (1-3mm)
    - **Stage 3**: Varicose veins (≥3mm, bulging)
    - **Stage 4**: Skin changes (pigmentation, eczema)
    - **Stage 5**: Ulcers (open wounds)
    """)
    
    st.markdown("---")
    st.markdown("**⚠️ Important:** This tool is for educational purposes only. Always consult healthcare professionals for medical advice.")