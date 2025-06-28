'use client'
import { useState, useRef, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { X, User, MapPin, Calendar, Camera, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export default function AssessmentModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    location: ''
  })
  const [files, setFiles] = useState()
  const [dragOver, setDragOver] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)

  const { messages, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [],
  })

  const handleUserInfoSubmit = (e) => {
    e.preventDefault()
    if (userInfo.name && userInfo.age && userInfo.location) {
      setStep(2)
    }
  }

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
    
    setStep(3)
  }, [files, handleSubmit])

  const clearImage = useCallback(() => {
    setFiles(undefined)
    setSelectedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const latestAnalysis = messages.filter(msg => msg.role === 'assistant').pop()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vein Health Assessment</h2>
            <p className="text-gray-600">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: User Information */}
        {step === 1 && (
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              <p className="text-gray-600 mt-2">Help us personalize your assessment</p>
            </div>

            <form onSubmit={handleUserInfoSubmit} className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={userInfo.age}
                  onChange={(e) => setUserInfo({...userInfo, age: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={userInfo.location}
                  onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State/Country"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Continue to Photo Upload
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Upload Your Photo</h3>
              <p className="text-gray-600 mt-2">Upload a clear photo of your legs for AI analysis</p>
            </div>

            <div className="max-w-2xl mx-auto">
              {!selectedImage ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                    dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600" />
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
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={selectedImage}
                      alt="Selected leg image"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
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

              {/* Photo Guidelines */}
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Photo Guidelines
                </h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• Take clear, well-lit photos of the affected leg</li>
                  <li>• Include front and side views if possible</li>
                  <li>• Ensure the entire leg is visible</li>
                  <li>• Avoid blurry or dark images</li>
                  <li>• Remove any clothing that obscures the leg</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Assessment Complete</h3>
              <p className="text-gray-600 mt-2">Hello {userInfo.name}, here are your results</p>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-600">Analyzing your image...</p>
              </div>
            )}

            {latestAnalysis && !isLoading && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">AI Analysis Results</h4>
                  <div className="prose prose-sm max-w-none">
                    <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800">
                      {latestAnalysis.content}
                    </pre>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-2">Patient Information</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">Name:</span>
                      <p className="text-blue-800">{userInfo.name}</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Age:</span>
                      <p className="text-blue-800">{userInfo.age} years</p>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Location:</span>
                      <p className="text-blue-800">{userInfo.location}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <p className="text-sm text-amber-800">
                    <strong>Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical consultation. Please consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Close Assessment
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Book Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}