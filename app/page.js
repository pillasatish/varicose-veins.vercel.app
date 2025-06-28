'use client'
import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Stats from './components/Stats'
import Footer from './components/Footer'
import AssessmentModal from './components/AssessmentModal'

export default function Home() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)

  return (
    <div className="min-h-screen gradient-bg">
      <Header onStartAssessment={() => setIsAssessmentOpen(true)} />
      <Hero onStartAssessment={() => setIsAssessmentOpen(true)} />
      <Features />
      <HowItWorks />
      <Stats />
      <Footer />
      
      {isAssessmentOpen && (
        <AssessmentModal onClose={() => setIsAssessmentOpen(false)} />
      )}
    </div>
  )
}