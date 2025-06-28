'use client'
import { useChat } from '@ai-sdk/react'
import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'

export default function AIAssessmentSection({ isModal = false }) {
  const { messages, handleSubmit, isLoading } = useChat({
    initialMessages: [],
  })

  const [files, setFiles] = useState()
  const [dragOver, setDragOver] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = useCallback((selectedFiles) => {
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0]
      if (file.type.startsWith('image/')) {
        setFiles(selectedFiles)
        const imageUrl = URL.createObjectURL(file)
        setSelectedImage(imageUrl)
      }
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFiles = e.dataTransfer.files
    handleFileSelect(droppedFiles)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleAnalyze = useCallback((event) => {
    if (!files) return
    
    const syntheticEvent = {
      preventDefault: () => {},
      target: { elements: {} }
    }
    
    handleSubmit(syntheticEvent, {
      allowEmptySubmit: true,
      experimental_attachments: files,
    })
  }, [files, handleSubmit])

  const clearImage = useCallback(() => {
    setFiles(undefined)
    setSelectedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const latestAnalysis = messages.filter(msg => msg.role === 'assistant').pop()

  const sectionClass = isModal ? "" : "py-20 bg-gradient-to-br from-blue-50 to-cyan-50"
  const containerClass = isModal ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

  return (
    <section id="ai-assessment" className={sectionClass}>
      <div className={containerClass}>
        {!isModal && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Varicose Vein Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload a photo of your legs for instant AI analysis and professional staging of varicose veins
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Upload Your Image
              </h3>
              
              {!selectedImage ? (
                <div
                  className={`upload-area border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    dragOver ? 'drag-over border-blue-500 bg-blue-50 transform scale-105' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-6">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
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
                    <Image
                      src={selectedImage}
                      alt="Selected leg image"
                      width={400}
                      height={300}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-400 disabled:to-cyan-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 transform hover:scale-105 disabled:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
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
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
            {isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-8 analysis-card">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center pulse-animation">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Analyzing Image...</h3>
                    <p className="text-gray-600 mt-2">Our AI is examining your image for signs of varicose veins</p>
                  </div>
                </div>
              </div>
            )}

            {latestAnalysis && !isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-8 analysis-card">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <svg className="w-7 h-7 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Analysis Results
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {latestAnalysis.content}
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

            {!latestAnalysis && !isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
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
  )
}