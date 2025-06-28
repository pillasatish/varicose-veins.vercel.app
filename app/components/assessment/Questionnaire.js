'use client'
import { useState } from 'react'
import { HelpCircle, ChevronLeft } from 'lucide-react'

const questions = [
  {
    id: 'visible_veins',
    question: 'Do you see any veins visible on your legs?',
    type: 'radio',
    options: [
      { value: 'none', label: 'No visible veins' },
      { value: 'spider', label: 'Small spider veins (thin, web-like)' },
      { value: 'reticular', label: 'Blue/green veins (1-3mm)' },
      { value: 'varicose', label: 'Large, bulging veins (>3mm)' }
    ]
  },
  {
    id: 'symptoms',
    question: 'What symptoms do you experience in your legs?',
    type: 'checkbox',
    options: [
      { value: 'none', label: 'No symptoms' },
      { value: 'heaviness', label: 'Heaviness or aching' },
      { value: 'swelling', label: 'Swelling' },
      { value: 'itching', label: 'Itching or burning' },
      { value: 'cramping', label: 'Cramping or restless legs' },
      { value: 'pain', label: 'Pain or throbbing' }
    ]
  },
  {
    id: 'skin_changes',
    question: 'Do you have any skin changes on your legs?',
    type: 'radio',
    options: [
      { value: 'none', label: 'No skin changes' },
      { value: 'discoloration', label: 'Skin discoloration or darkening' },
      { value: 'dryness', label: 'Dry, flaky, or itchy skin' },
      { value: 'ulcers', label: 'Open sores or ulcers' }
    ]
  },
  {
    id: 'previous_treatment',
    question: 'Have you had any treatment for varicose veins previously?',
    type: 'radio',
    options: [
      { value: 'none', label: 'No previous treatment' },
      { value: 'compression', label: 'Compression stockings only' },
      { value: 'sclerotherapy', label: 'Sclerotherapy (injection treatment)' },
      { value: 'surgery', label: 'Surgical treatment' },
      { value: 'laser', label: 'Laser or radiofrequency treatment' }
    ]
  },
  {
    id: 'family_history',
    question: 'Do you have a family history of varicose veins?',
    type: 'radio',
    options: [
      { value: 'no', label: 'No family history' },
      { value: 'yes', label: 'Yes, family members have varicose veins' },
      { value: 'unknown', label: 'Not sure' }
    ]
  }
]

export default function Questionnaire({ data, updateData, onNext, onPrev }) {
  const [answers, setAnswers] = useState(data.questionnaire || {})
  const [errors, setErrors] = useState({})

  const handleAnswerChange = (questionId, value, isCheckbox = false) => {
    if (isCheckbox) {
      const currentAnswers = answers[questionId] || []
      let newAnswers
      
      if (value === 'none') {
        newAnswers = currentAnswers.includes('none') ? [] : ['none']
      } else {
        newAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter(v => v !== value)
          : [...currentAnswers.filter(v => v !== 'none'), value]
      }
      
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers }))
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }))
    }
    
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }))
    }
  }

  const validateAnswers = () => {
    const newErrors = {}
    
    questions.forEach(question => {
      if (!answers[question.id] || 
          (Array.isArray(answers[question.id]) && answers[question.id].length === 0)) {
        newErrors[question.id] = 'Please answer this question'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateAnswers()) {
      updateData({ questionnaire: answers })
      onNext()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Health Assessment</h3>
        <p className="text-slate-400">Please answer these questions about your vein health</p>
      </div>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-slate-700/50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-white mb-4">
              {index + 1}. {question.question}
            </h4>
            
            <div className="space-y-3">
              {question.options.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type={question.type}
                    name={question.id}
                    value={option.value}
                    checked={
                      question.type === 'radio' 
                        ? answers[question.id] === option.value
                        : (answers[question.id] || []).includes(option.value)
                    }
                    onChange={(e) => handleAnswerChange(
                      question.id, 
                      option.value, 
                      question.type === 'checkbox'
                    )}
                    className="w-4 h-4 text-green-500 bg-slate-600 border-slate-500 focus:ring-green-500"
                  />
                  <span className="text-slate-300">{option.label}</span>
                </label>
              ))}
            </div>
            
            {errors[question.id] && (
              <p className="text-red-400 text-sm mt-2">{errors[question.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
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