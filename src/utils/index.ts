import { readdirSync } from 'fs'
import { resolve } from 'path'

const utilsDir = resolve(__dirname, '..')
const files = readdirSync(utilsDir)

files.forEach((file) => {
  if (file.endsWith('.ts') && file!== 'index.ts') {
    const filePath = resolve(utilsDir, file)
    const content = `export * from './${file.replace('.ts', '')}';\n`
    require('fs').appendFileSync(filePath, content, 'utf8')
  }
})