import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, X } from 'lucide-react';

const VenoScanSection = () => {
  const [files, setFiles] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((selectedFiles) => {
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      if (file.type.startsWith('image/')) {
        setFiles([file]);
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setError(null);
      } else {
        setError('Please select a valid image file');
      }
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!files || files.length === 0) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', files[0]);

      // Convert file to base64 for API
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result;
        
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'user',
                content: 'Please analyze this image for varicose veins.',
                experimental_attachments: [
                  {
                    url: base64,
                    contentType: files[0].type,
                    name: files[0].name,
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          throw new Error('Analysis failed');
        }

        const reader = response.body.getReader();
        let result = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const data = JSON.parse(line.slice(2));
                if (data.type === 'text-delta') {
                  result += data.textDelta;
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
        
        setAnalysis(result);
      };
      
      reader.readAsDataURL(files[0]);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [files]);

  const clearImage = useCallback(() => {
    setFiles(null);
    setSelectedImage(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Varicose Vein Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a photo of your legs for instant AI analysis and staging of varicose veins
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Camera className="w-6 h-6 mr-3 text-blue-600" />
                Upload Your Image
              </h3>
              
              {!selectedImage ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    dragOver 
                      ? 'border-blue-500 bg-blue-50 transform scale-105' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-6">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xl font-medium text-gray-900">Drop your image here</p>
                      <p className="text-gray-500 mt-2">or click to browse files</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      Supports: JPG, PNG, WEBP (Max 10MB)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 group">
                    <img
                      src={selectedImage}
                      alt="Selected leg image"
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-400 disabled:to-cyan-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 transform hover:scale-105 disabled:scale-100"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        <span>Start AI Analysis</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileSelect(e.target.files)}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Guidelines */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h4 className="font-semibold text-amber-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Photo Guidelines
              </h4>
              <ul className="text-sm text-amber-700 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Take clear, well-lit photos of the affected leg
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Include front and side views if possible
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ensure the entire leg is visible
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Avoid blurry or dark images
                </li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center text-red-800">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-xl p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Analyzing Image...</h3>
                    <p className="text-gray-600 mt-2">Our AI is examining your image for signs of varicose veins</p>
                  </div>
                </div>
              </div>
            )}

            {analysis && !isAnalyzing && (
              <div className="bg-white rounded-xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-7 h-7 mr-3 text-green-600" />
                  Analysis Results
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {analysis}
                    </pre>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-sm text-blue-800">
                      <strong className="font-semibold">Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical consultation. Please consult with a healthcare provider for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!analysis && !isAnalyzing && !error && (
              <div className="bg-white rounded-xl shadow-xl p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Camera className="w-10 h-10 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Ready for Analysis</h3>
                    <p className="text-gray-600 mt-2">Upload a leg image to get started with AI-powered varicose vein detection</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenoScanSection;