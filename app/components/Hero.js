'use client'
import { ArrowRight, Users, Target, Clock } from 'lucide-react'

export default function Hero({ onStartAssessment }) {
  return (
    <section className="pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-green-400 font-semibold">VenoScan</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Advanced Vein Health{' '}
              <span className="gradient-text">Assessment</span>
            </h1>
            
            <p className="text-xl text-slate-400 leading-relaxed">
              Get personalized treatment recommendations with our AI-powered assessment system. 
              Quick, accurate, and designed for your health.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartAssessment}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">10K+</div>
                <div className="text-sm text-slate-400">Patients Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">98%</div>
                <div className="text-sm text-slate-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-96 h-96 mx-auto bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-green-500/30 to-cyan-500/30 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-green-500/40 to-cyan-500/40 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Users className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}