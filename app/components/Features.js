'use client'
import { Shield, Clock, Users, Award } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: "Clinically Validated",
    description: "Our assessment is based on medical guidelines and validated by healthcare professionals."
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Complete your assessment in just 5 minutes and get instant results."
  },
  {
    icon: Users,
    title: "Expert Network",
    description: "Connect with qualified specialists in your area for personalized care."
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Join thousands of patients who have improved their vein health with our guidance."
  }
]

export default function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose VenoScan?</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We combine medical expertise with cutting-edge technology to provide you with 
            the best possible care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/50 p-8 rounded-2xl card-hover border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}