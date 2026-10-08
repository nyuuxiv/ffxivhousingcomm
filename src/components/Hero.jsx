import { useState } from 'react'
import Lightbox from './Lightbox'
import Photo from './Photo'

const heroShot = {
  id: 'hero-1',
  alt: 'Celestial lounge with a cream sectional sofa in an arched alcove showing a full moon, golden crescent-moon lanterns overhead, a telescope, a glowing blue crystal, a lit fireplace and a bear-skin rug',
}

function Hero() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="top" className="scroll-mt-16 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-stone-400">
            Final Fantasy XIV · Housing
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            Headline about turning an empty house into a home
          </h1>
          <p className="mt-6 max-w-prose text-lg text-stone-300">
            One or two sentences about who you are and what you offer.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-stone-100 px-6 py-3 font-medium text-stone-950 hover:bg-white"
            >
              Request a commission
            </a>
            <a
              href="#gallery"
              className="rounded-lg border border-stone-600 px-6 py-3 font-medium hover:border-stone-400"
            >
              See the work
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          aria-label={`View larger: ${heroShot.alt}`}
          className="block w-full cursor-zoom-in rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Photo id={heroShot.id} alt="" className="aspect-[4/3]" priority />
        </button>
      </div>
      <Lightbox
        shots={[heroShot]}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </section>
  )
}

export default Hero
