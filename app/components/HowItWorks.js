'use client'
import { FileText, Brain, Stethoscope } from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: "Complete Assessment",
    description: "Answer a few simple questions about your symptoms and medical history."
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your responses and provides personalized insights."
  },
  {
    icon: Stethoscope,
    title: "Get Recommendations",
    description: "Receive treatment options and connect with specialists in your area."
  }
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-slate-400">
            Get personalized vein health recommendations in three simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="step-indicator w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500">
                <step.icon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}