import { useState } from 'react'
import Lightbox from './Lightbox'
import Photo from './Photo'

const shots = [
  { id: '1', alt: 'Bedroom seen from a high angle, with a writing desk, potted plants and a bathtub alcove' },
  { id: '2', alt: 'Bedroom seen from above, with a patterned marble floor, bookshelves and framed butterflies' },
  { id: '3', alt: 'Candlelit garden with two stone columns around a round planter, and a wooden table with a basket of apples and fresh bread' },
  { id: '4', alt: 'Dim marble hall with ivy-wrapped columns, white curtains, a yellow-cushioned daybed and hanging colored lanterns' },
]

function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="gallery" className="scroll-mt-16 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-semibold">Gallery</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {shots.map((shot, index) => (
            <li key={shot.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`View larger: ${shot.alt}`}
                className="block w-full cursor-zoom-in rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Photo id={shot.id} alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox
        shots={shots}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </section>
  )
}

export default Gallery
