function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-lg border border-stone-800 p-8 text-center md:p-16">
          <h2 className="text-3xl font-semibold">Ready to start?</h2>
          <p className="mx-auto mt-4 max-w-prose text-stone-300">
            Short line about how to reach you (Discord, character name, server).
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-lg bg-stone-100 px-6 py-3 font-medium text-stone-950 hover:bg-white"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
