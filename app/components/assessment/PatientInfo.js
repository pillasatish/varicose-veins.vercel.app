'use client'
import { useState, useEffect } from 'react'
import { User, Calendar, MapPin } from 'lucide-react'

export default function PatientInfo({ data, updateData, onNext, isFirst }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    gender: '',
    ...data.patientInfo
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.age || formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Please enter a valid age (18-100)'
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.gender) newErrors.gender = 'Please select your gender'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      updateData({ patientInfo: formData })
      onNext()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Patient Information</h3>
        <p className="text-slate-400">Please provide your basic information to get started</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.name ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          }
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Age *
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.age ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="Enter your age"
            min="18"
            max="100"
          />
          {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
          }
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.location ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="City, State/Country"
          />
          {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
          }
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.gender ? 'border-red-500' : 'border-slate-600'
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
          }
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}