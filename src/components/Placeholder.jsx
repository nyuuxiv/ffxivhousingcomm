// Caixa cinza que reserva o lugar de uma imagem no wireframe.
function Placeholder({ label, className = 'aspect-video' }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-lg border border-dashed border-stone-600 bg-stone-800 text-sm text-stone-400 ${className}`}
    >
      {label}
    </div>
  )
}

export default Placeholder
