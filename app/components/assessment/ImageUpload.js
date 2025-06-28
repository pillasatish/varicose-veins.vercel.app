'use client'
import { useState, useRef } from 'react'
import { Upload, Camera, ChevronLeft, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export default function ImageUpload({ data, updateData, onNext, onPrev }) {
  const [selectedImage, setSelectedImage] = useState(data.image || null)
  const [dragOver, setDragOver] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage({ file, url: imageUrl })
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const clearImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    
    try {
      // Convert image to base64
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new window.Image()
      
      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        const base64 = canvas.toDataURL('image/jpeg', 0.8)
        
        // Call API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{
              role: 'user',
              content: 'Please analyze this image for varicose veins.',
              experimental_attachments: [{ url: base64 }]
            }]
          })
        })

        if (response.ok) {
          const reader = response.body.getReader()
          let analysis = ''
          
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            const chunk = new TextDecoder().decode(value)
            const lines = chunk.split('\n')
            
            for (const line of lines) {
              if (line.startsWith('0:')) {
                try {
                  const data = JSON.parse(line.slice(2))
                  if (data.content) {
                    analysis += data.content
                  }
                } catch (e) {
                  // Ignore parsing errors
                }
              }
            }
          }
          
          updateData({ 
            image: selectedImage,
            analysis: analysis.trim()
          })
          onNext()
        } else {
          throw new Error('Analysis failed')
        }
      }
      
      img.src = selectedImage.url
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Upload Leg Photo</h3>
        <p className="text-slate-400">Upload a clear image of your leg for AI analysis</p>
      </div>

      {!selectedImage ? (
        <div
          className={`upload-area p-12 rounded-xl text-center cursor-pointer transition-all ${
            dragOver ? 'drag-over' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 text-green-400" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-2">Drop your image here</p>
              <p className="text-slate-400">or click to browse files</p>
            </div>
            <div className="text-sm text-slate-500">
              Supports: JPG, PNG, WEBP (Max 10MB)
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden bg-slate-700">
            <Image
              src={selectedImage.url}
              alt="Selected leg image"
              width={600}
              height={400}
              className="w-full h-80 object-cover"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                <span>Analyzing Image...</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span>Start AI Analysis</span>
              </>
            )}
          </button>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileSelect(e.target.files[0])}
        accept="image/*"
        className="hidden"
      />

      {/* Photo Guidelines */}
      <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-6">
        <h4 className="font-semibold text-amber-300 mb-3 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Photo Guidelines
        </h4>
        <ul className="text-sm text-amber-200 space-y-2">
          <li>• Take clear, well-lit photos of the affected leg</li>
          <li>• Include front and side views if possible</li>
          <li>• Ensure the entire leg is visible</li>
          <li>• Avoid blurry or dark images</li>
          <li>• Remove any clothing that obscures the leg</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
      </div>
    </div>
  )
}