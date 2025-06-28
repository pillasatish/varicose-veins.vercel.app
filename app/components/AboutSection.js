export default function AboutSection() {
  const stats = [
    { number: "10,000+", label: "Scans Completed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Available" },
    { number: "5", label: "Stage Classification" }
  ]

  const features = [
    {
      title: "Advanced AI Technology",
      description: "Our proprietary computer vision algorithms are trained on thousands of medical images to provide accurate varicose vein detection.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Medical Grade Accuracy",
      description: "Validated by medical professionals and tested against clinical standards to ensure reliable diagnostic support.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Instant Results",
      description: "Get comprehensive analysis results in seconds, enabling quick decision-making for your health.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About VenoScan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading the future of vascular health with AI-powered diagnostic technology
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Revolutionizing Varicose Vein Diagnosis
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              VenoScan represents a breakthrough in medical technology, combining advanced artificial intelligence 
              with computer vision to provide instant, accurate varicose vein analysis. Our platform democratizes 
              access to professional-grade diagnostic tools, making early detection and monitoring more accessible 
              than ever before.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Developed in collaboration with leading vascular specialists, our AI has been trained on thousands 
              of clinical images to recognize the subtle signs and stages of varicose veins with remarkable precision.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">FDA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">HIPAA Secure</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">Stage 1</div>
                    <div className="text-sm text-gray-600">Spider Veins</div>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-600">Stage 2</div>
                    <div className="text-sm text-gray-600">Reticular</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">Stage 3</div>
                    <div className="text-sm text-gray-600">Varicose</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">Stage 4+</div>
                    <div className="text-sm text-gray-600">Advanced</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">5-Stage Classification</div>
                  <div className="text-sm text-gray-600">Comprehensive staging system</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white mx-auto">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}