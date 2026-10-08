import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const controlClass =
  'absolute flex size-12 items-center justify-center rounded-full bg-stone-900/80 text-2xl text-white hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

// Janela com a imagem em tamanho grande. index === null significa fechada.
// Clique na imagem (ou no botao de lupa) alterna entre "caber na tela" e tamanho original.
function Lightbox({ shots, index, onClose, onChange }) {
  const dialogRef = useRef(null)
  const scrollRef = useRef(null)
  const imgRef = useRef(null)
  const zoomPoint = useRef({ x: 0.5, y: 0.5 })
  // Guarda de qual imagem e o zoom, entao ele volta ao normal sozinho ao trocar de imagem.
  const [zoomedIndex, setZoomedIndex] = useState(null)

  const isOpen = index !== null
  const shot = isOpen ? shots[index] : null
  const hasMany = shots.length > 1
  const zoomed = isOpen && zoomedIndex === index

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Trava a rolagem da pagina enquanto a janela esta aberta.
  useEffect(() => {
    if (!isOpen) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  // Ao dar zoom, centraliza o ponto clicado (ou o meio da imagem, se veio do botao).
  useLayoutEffect(() => {
    if (!zoomed) return
    const scroll = scrollRef.current
    const img = imgRef.current
    scroll.scrollLeft = img.offsetLeft + zoomPoint.current.x * img.offsetWidth - scroll.clientWidth / 2
    scroll.scrollTop = img.offsetTop + zoomPoint.current.y * img.offsetHeight - scroll.clientHeight / 2
  }, [zoomed])

  const close = () => {
    setZoomedIndex(null)
    onClose()
  }

  const go = (step) => onChange((index + step + shots.length) % shots.length)

  const toggleZoom = (point) => {
    zoomPoint.current = point
    setZoomedIndex(zoomed ? null : index)
  }

  const handleImageClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    toggleZoom({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    })
  }

  const handleKeyDown = (event) => {
    if (!hasMany) return
    if (event.key === 'ArrowLeft') go(-1)
    if (event.key === 'ArrowRight') go(1)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Image viewer"
      onClose={close}
      onKeyDown={handleKeyDown}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent text-white backdrop:bg-black/90"
    >
      {shot && (
        <div className="relative h-full w-full">
          <div
            ref={scrollRef}
            className="flex h-full w-full overflow-auto p-4 md:p-16"
            onClick={(event) => {
              if (!zoomed && event.target === event.currentTarget) close()
            }}
          >
            <img
              ref={imgRef}
              key={shot.id}
              src={`/img/${shot.id}-full.webp`}
              alt={shot.alt}
              onClick={handleImageClick}
              className={`m-auto rounded-lg ${
                zoomed
                  ? 'max-h-none max-w-none shrink-0 cursor-zoom-out'
                  : 'max-h-full max-w-full cursor-zoom-in object-contain'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className={`${controlClass} right-4 top-4`}
          >
            <span aria-hidden="true">✕</span>
          </button>
          <button
            type="button"
            onClick={() => toggleZoom({ x: 0.5, y: 0.5 })}
            aria-label={zoomed ? 'Fit image to screen' : 'Zoom to full size'}
            aria-pressed={zoomed}
            className={`${controlClass} right-20 top-4`}
          >
            <span aria-hidden="true">{zoomed ? '−' : '+'}</span>
          </button>

          {hasMany && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className={`${controlClass} left-4 top-1/2 -translate-y-1/2`}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className={`${controlClass} right-4 top-1/2 -translate-y-1/2`}
              >
                <span aria-hidden="true">›</span>
              </button>

              <p
                aria-live="polite"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-stone-900/80 px-4 py-1 text-sm"
              >
                {index + 1} / {shots.length}
              </p>
            </>
          )}
        </div>
      )}
    </dialog>
  )
}

export default Lightbox
