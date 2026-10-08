const services = [
  { title: 'Service one', text: 'Short description of what is included.' },
  { title: 'Service two', text: 'Short description of what is included.' },
  { title: 'Service three', text: 'Short description of what is included.' },
]

function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-semibold">Services</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <li key={service.title} className="rounded-lg border border-stone-800 p-6">
              <h3 className="text-xl font-medium">{service.title}</h3>
              <p className="mt-3 text-stone-300">{service.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
