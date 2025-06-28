'use client'
import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, NY',
      content: 'The assessment was incredibly thorough and helped me understand my condition better. The recommendations were spot-on!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      location: 'Los Angeles, CA',
      content: 'Quick, easy, and professional. I was connected with a great specialist who helped me get the treatment I needed.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      location: 'Chicago, IL',
      content: 'I was hesitant at first, but the assessment gave me the confidence to seek treatment. Very grateful for this service.',
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied patients who have improved their vein health.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8">
              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}