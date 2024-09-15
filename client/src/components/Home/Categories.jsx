import React from 'react'
import Navbar from '../Common/Navbar'

const Categories = () => {

  const callouts = [
    {
      name: 'All Categories',
      description: 'Journals and note-taking',
      imageSrc: '/categories/all.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '/categories/all',
    },
    {
      name: 'Birthdays',
      description: 'Journals and note-taking',
      imageSrc: '/categories/birthdays.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '/categories/birthdays',
    },
    {
      name: 'Love',
      description: 'Daily commute essentials',
      imageSrc: '/categories/love.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '/categories/love',
    },
    {
      name: 'Marriages',
      description: 'Daily commute essentials',
      imageSrc: '/categories/marriages.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '/categories/love',
    },
    {
      name: 'Grand Openings',
      description: 'Daily commute essentials',
      imageSrc: '/categories/grandopenings.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '/categories/love',
    },
    {
      name: 'Sympathy',
      description: 'Daily commute essentials',
      imageSrc: '/categories/sympathy.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '/categories/love',
    },
  ]

  return (
    <div>
    <Navbar />
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-1 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-2 text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-1" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
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
