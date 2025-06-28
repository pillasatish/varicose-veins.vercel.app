'use client'
import { Users, Shield, Award, Clock } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: "10,000+",
    label: "Patients Served"
  },
  {
    icon: Shield,
    number: "98%",
    label: "Accuracy Rate"
  },
  {
    icon: Award,
    number: "50+",
    label: "Partner Clinics"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Support Available"
  }
]

export default function Stats() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-slate-400">
            Leading healthcare providers trust VenoScan for accurate vein health assessment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}