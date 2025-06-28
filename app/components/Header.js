'use client'
import { Heart } from 'lucide-react'

export default function Header({ onStartAssessment }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">VenoScan</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Treatments</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
          </nav>
          
          <button
            onClick={onStartAssessment}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Start Assessment →
          </button>
        </div>
      </div>
    </header>
  )
}