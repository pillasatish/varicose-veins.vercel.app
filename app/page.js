'use client'
import { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import WhyChooseSection from './components/WhyChooseSection'
import HowItWorksSection from './components/HowItWorksSection'
import TestimonialsSection from './components/TestimonialsSection'
import TrustSection from './components/TrustSection'
import Footer from './components/Footer'
import AssessmentModal from './components/AssessmentModal'

export default function HomePage() {
  const [showAssessment, setShowAssessment] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navigation onStartAssessment={() => setShowAssessment(true)} />
      <HeroSection onStartAssessment={() => setShowAssessment(true)} />
      <WhyChooseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <TrustSection />
      <Footer />
      
      {showAssessment && (
        <AssessmentModal onClose={() => setShowAssessment(false)} />
      )}
    </div>
  )
}