'use client'
import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AIAssessmentSection from './components/AIAssessmentSection'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function Home() {
  const [showAIAssessment, setShowAIAssessment] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navigation onAIAssessmentClick={() => setShowAIAssessment(true)} />
      <HeroSection onGetStarted={() => setShowAIAssessment(true)} />
      <ServicesSection />
      <AIAssessmentSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      {showAIAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">AI Varicose Vein Assessment</h2>
              <button
                onClick={() => setShowAIAssessment(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AIAssessmentModal onClose={() => setShowAIAssessment(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

function AIAssessmentModal({ onClose }) {
  return (
    <div className="p-6">
      <AIAssessmentSection isModal={true} />
    </div>
  )
}