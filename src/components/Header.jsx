const links = [
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-800 bg-stone-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#top" className="font-semibold">
          Housing Commissions
        </a>
        <nav aria-label="Main">
          <ul className="flex gap-4 text-sm md:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-stone-300 hover:text-white focus-visible:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
