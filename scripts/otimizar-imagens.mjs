// Gera versoes WebP de originais/ em public/img/ (800px, 1600px e full = tamanho original).
// Arquivo na raiz: originais/4.jpeg -> 4-1600.webp
// Arquivo em subpasta: originais/hero/1.png -> hero-1-1600.webp
// Uso: npm run imagens
import { mkdir, readdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

const origem = 'originais'
const destino = 'public/img'
const larguras = [1600, 800]
// 1-100. Imagens escuras e cheias de detalhe fino (hero, jardim) perdem textura abaixo de 90.
const qualidade = 90
const ehImagem = (nome) => /\.(jpe?g|png)$/i.test(nome)

await mkdir(destino, { recursive: true })

// Monta a lista de { caminho, id } olhando a raiz e um nivel de subpastas.
const imagens = []
for (const entrada of await readdir(origem, { withFileTypes: true })) {
  if (entrada.isFile() && ehImagem(entrada.name)) {
    imagens.push({ caminho: join(origem, entrada.name), id: basename(entrada.name, extname(entrada.name)) })
  }
  if (entrada.isDirectory()) {
    for (const arquivo of await readdir(join(origem, entrada.name))) {
      if (ehImagem(arquivo)) {
        imagens.push({
          caminho: join(origem, entrada.name, arquivo),
          id: `${entrada.name}-${basename(arquivo, extname(arquivo))}`,
        })
      }
    }
  }
}

const vistos = new Map()
for (const { caminho, id } of imagens) {
  if (vistos.has(id)) {
    console.warn(`ATENCAO: "${caminho}" e "${vistos.get(id)}" geram o mesmo nome (${id}). O ultimo sobrescreve o primeiro.`)
  }
  vistos.set(id, caminho)
}

for (const { caminho, id } of imagens) {
  for (const largura of larguras) {
    const saida = join(destino, `${id}-${largura}.webp`)
    const info = await sharp(caminho)
      .resize({ width: largura, withoutEnlargement: true })
      .webp({ quality: qualidade, effort: 6 })
      .toFile(saida)
    console.log(`${saida}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`)
  }

  // Versao "full": resolucao original, usada so na janela ampliada (com zoom).
  const saidaFull = join(destino, `${id}-full.webp`)
  const infoFull = await sharp(caminho).webp({ quality: qualidade, effort: 6 }).toFile(saidaFull)
  console.log(`${saidaFull}  ${infoFull.width}x${infoFull.height}  ${Math.round(infoFull.size / 1024)} KB`)
}
