import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import Process from './components/Process'
import Services from './components/Services'

function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-stone-950"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
