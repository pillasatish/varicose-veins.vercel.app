'use client'
import { Shield, Clock, Users, TrendingUp } from 'lucide-react'

export default function WhyChooseSection() {
  const features = [
    {
      icon: Shield,
      title: 'Clinically Validated',
      description: 'Our assessment is based on medical guidelines and validated by healthcare professionals.'
    },
    {
      icon: Clock,
      title: 'Quick & Easy',
      description: 'Complete your assessment in just 5 minutes and get instant results.'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Connect with qualified specialists in your area for personalized care.'
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Join thousands of patients who have improved their vein health with our guidance.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose QurePlus?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine medical expertise with cutting-edge technology to provide you with the best possible care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}