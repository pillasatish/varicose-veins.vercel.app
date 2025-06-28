export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Vascular Surgeon",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "VenoScan has revolutionized how I approach initial patient assessments. The AI accuracy is remarkable and helps me prioritize cases more effectively.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "I was able to get an instant assessment of my leg condition. The detailed analysis helped me understand when to seek professional treatment.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Primary Care Physician",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "As a primary care doctor, VenoScan helps me make better referral decisions. The staging information is incredibly detailed and accurate.",
      rating: 5
    },
    {
      name: "Jennifer Walsh",
      role: "Patient",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The convenience of getting an AI assessment from home is amazing. It gave me the confidence to seek treatment early.",
      rating: 5
    },
    {
      name: "Dr. Robert Kim",
      role: "Interventional Radiologist",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The precision of VenoScan's staging system aligns perfectly with clinical standards. It's become an essential tool in my practice.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Patient",
      image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Quick, easy, and surprisingly accurate. VenoScan helped me track my treatment progress over time with follow-up scans.",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals & Patients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what medical professionals and patients are saying about VenoScan
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join Thousands of Satisfied Users
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Experience the future of varicose vein assessment with our AI-powered platform
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Your Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}