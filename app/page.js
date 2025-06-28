'use client'
import { useChat } from '@ai-sdk/react'
import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'

export default function VenoScan() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">VenoScan</h1>
              <p className="text-sm text-gray-600">AI-Powered Varicose Vein Analysis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Leg Image</h2>
              
              {!selectedImage ? (
                <div
                  className={`upload-area border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragOver ? 'drag-over border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">Drop your image here</p>
                      <p className="text-sm text-gray-500">or click to browse files</p>
                    </div>
                    <div className="text-xs text-gray-400">
                      Supports: JPG, PNG, WEBP (Max 10MB)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={selectedImage}
                      alt="Selected leg image"
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-400 disabled:to-cyan-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Start Analysis</span>
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

            {/* Instructions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Photo Guidelines
              </h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Take clear, well-lit photos of the affected leg</li>
                <li>• Include front and side views if possible</li>
                <li>• Ensure the entire leg is visible</li>
                <li>• Avoid blurry or dark images</li>
                <li>• Remove any clothing that obscures the leg</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-6 analysis-card">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center pulse-animation">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analyzing Image...</h3>
                    <p className="text-gray-600">Our AI is examining your image for signs of varicose veins</p>
                  </div>
                </div>
              </div>
            )}

            {latestAnalysis && !isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-6 analysis-card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Analysis Results
                </h3>
                
                <div className="prose prose-sm max-w-none">
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                    {latestAnalysis.content}
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical consultation. Please consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            )}

            {!latestAnalysis && !isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Ready for Analysis</h3>
                    <p className="text-gray-600">Upload a leg image to get started with AI-powered varicose vein detection</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}