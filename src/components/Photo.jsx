// Imagem otimizada de public/img: id "4" usa 4-800.webp e 4-1600.webp.
function Photo({ id, alt, className = 'aspect-video', priority = false }) {
  return (
    <img
      src={`/img/${id}-1600.webp`}
      srcSet={`/img/${id}-800.webp 800w, /img/${id}-1600.webp 1600w`}
      sizes="(min-width: 1152px) 560px, 100vw"
      width="1600"
      height="899"
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`w-full rounded-lg object-cover ${className}`}
    />
  )
}

export default Photo
