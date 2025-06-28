'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import PatientInfo from './assessment/PatientInfo'
import Questionnaire from './assessment/Questionnaire'
import ImageUpload from './assessment/ImageUpload'
import Results from './assessment/Results'

const steps = [
  { id: 'info', title: 'Patient Information', component: PatientInfo },
  { id: 'questions', title: 'Health Questions', component: Questionnaire },
  { id: 'upload', title: 'Upload Photo', component: ImageUpload },
  { id: 'results', title: 'Analysis Results', component: Results }
]

export default function AssessmentModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentData, setAssessmentData] = useState({
    patientInfo: {},
    questionnaire: {},
    image: null,
    analysis: null
  })

  const updateAssessmentData = (stepData) => {
    setAssessmentData(prev => ({ ...prev, ...stepData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentComponent = steps[currentStep].component

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">AI Vein Health Assessment</h2>
            <p className="text-slate-400">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-slate-900/50">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index <= currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-slate-600 text-slate-300'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-green-500' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <CurrentComponent
            data={assessmentData}
            updateData={updateAssessmentData}
            onNext={nextStep}
            onPrev={prevStep}
            isFirst={currentStep === 0}
            isLast={currentStep === steps.length - 1}
          />
        </div>
      </div>
    </div>
  )
}