const steps = [
  { title: 'Step one', text: 'What happens first.' },
  { title: 'Step two', text: 'What happens next.' },
  { title: 'Step three', text: 'How it is delivered.' },
]

function Process() {
  return (
    <section id="process" className="scroll-mt-16 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="text-sm text-stone-400">0{index + 1}</span>
              <h3 className="mt-2 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-stone-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
