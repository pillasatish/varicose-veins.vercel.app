'use client'
import { CheckCircle, AlertTriangle, Download, Share } from 'lucide-react'

export default function Results({ data }) {
  const { patientInfo, questionnaire, analysis } = data

  const downloadReport = () => {
    const reportContent = `
VenoScan Assessment Report
========================

Patient Information:
- Name: ${patientInfo.name}
- Age: ${patientInfo.age}
- Location: ${patientInfo.location}
- Gender: ${patientInfo.gender}

Assessment Date: ${new Date().toLocaleDateString()}

AI Analysis Results:
${analysis}

Disclaimer: This analysis is for informational purposes only and should not replace professional medical consultation.
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `venoscan-report-${patientInfo.name.replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Analysis Complete</h3>
        <p className="text-slate-400">Your AI-powered vein health assessment results</p>
      </div>

      {analysis && (
        <div className="bg-slate-700/50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">AI Analysis Results</h4>
          <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-300 whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}

      <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-amber-300 mb-2">Medical Disclaimer</h4>
            <p className="text-amber-200 text-sm leading-relaxed">
              This analysis is for informational purposes only and should not replace professional medical consultation. 
              Please consult with a healthcare provider for proper diagnosis and treatment. The AI assessment is based 
              on visual analysis and questionnaire responses, and may not capture all medical factors.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={downloadReport}
          className="flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Download Report</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          <Share className="w-5 h-5" />
          <span>Share with Doctor</span>
        </button>
      </div>

      <div className="text-center">
        <h4 className="text-lg font-semibold text-white mb-4">Next Steps</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-400 mb-2">Consult a Specialist</h5>
            <p className="text-slate-300 text-sm">Book an appointment with a vascular specialist in your area</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-400 mb-2">Lifestyle Changes</h5>
            <p className="text-slate-300 text-sm">Learn about exercises and habits that can improve vein health</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h5 className="font-semibold text-green-400 mb-2">Follow-up Assessment</h5>
            <p className="text-slate-300 text-sm">Schedule regular assessments to monitor your vein health</p>
          </div>
        </div>
      </div>
    </div>
  )
}