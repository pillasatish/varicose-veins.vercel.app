'use client'

export default function TrustSection() {
  const stats = [
    { number: '10,000+', label: 'Patients Served' },
    { number: '98%', label: 'Accuracy Rate' },
    { number: '50+', label: 'Partner Clinics' },
    { number: '24/7', label: 'Support Available' }
  ]

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Leading healthcare providers trust QurePlus for accurate vein health assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-blue-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}