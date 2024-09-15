import React from 'react'
import Navbar from '../Common/Navbar'

const Categories = () => {

  const callouts = [
    {
      name: 'All Categories',
      description: 'All categories of flowers are available here',
      imageSrc: '/categories/all.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '/categories/all',
    },
    {
      name: 'Birthdays',
      description: 'Flowers for birthdays',
      imageSrc: '/categories/birthdays.jpg',
      href: '/products/birthdays',
    },
    {
      name: 'Love',
      description: 'Flowers for love occasions',
      imageSrc: '/categories/love.jpg',
      href: '/products/love',
    },
    {
      name: 'Marriages',
      description: 'Flowers for marriages',
      imageSrc: '/categories/marriages.jpg',
      href: '/products/marriages',
    },
    {
      name: 'Grand Openings',
      description: 'Flowers for grand openings',
      imageSrc: '/categories/grandopenings.jpg',
      href: '/products/grand-openings',
    },
    {
      name: 'Sympathy',
      description: 'Flowers for sympathy',
      imageSrc: '/categories/sympathy.jpg',
      href: '/products/sympathy',
    },
  ]

  return (
    <div>
    <Navbar />
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-10">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

          <div className="mt-3 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0.5">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <a href={callout.href}>
                  <h3 className="mt-2 text-gray-500">
                    <span className="absolute inset-1" />
                    {callout.name}
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description} <span aria-hidden="true">→</span></p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Categories
