#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const [, , rawName] = process.argv

if (!rawName) {
  console.error('Usage: npm run create:ui <component-name>')
  process.exit(1)
}

const toKebab = (value) =>
  value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()

const kebab = toKebab(rawName)

if (!/^[a-z][a-z0-9-]*$/.test(kebab)) {
  console.error('Component name must be alphanumeric/kebab-case (example: button, ui-button).')
  process.exit(1)
}

const toPascal = (value) =>
  value
    .split('-')
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('')

const pascal = toPascal(kebab)
const blockClass = `ui-${kebab}`
const componentName = `Ui${pascal}`
const componentDir = path.join(projectRoot, 'components', 'ui', kebab)
const templatePath = path.join(projectRoot, 'components', 'ui', '_template', 'Component.vue')
const targetVuePath = path.join(componentDir, `${componentName}.vue`)

const indexPath = path.join(projectRoot, 'components', 'ui', 'index.ts')

async function main() {
  const exists = await fs
    .access(componentDir)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await fs.mkdir(componentDir, { recursive: true })
  }

  const template = await fs.readFile(templatePath, 'utf8')

  const replaced = template
    .replace(/ui-component/g, blockClass)
    .replace(/UiComponent/g, componentName)

  await fs.writeFile(targetVuePath, replaced, 'utf8')

  // Remove placeholder gitkeep if present
  const gitkeepPath = path.join(componentDir, '.gitkeep')
  const gitkeepExists = await fs
    .access(gitkeepPath)
    .then(() => true)
    .catch(() => false)
  if (gitkeepExists) {
    await fs.unlink(gitkeepPath)
  }

  const exportLine = `export { default as ${componentName} } from './${kebab}/${componentName}.vue'\n`
  let indexContent = ''
  try {
    indexContent = await fs.readFile(indexPath, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') {
      indexContent = ''
    } else {
      throw error
    }
  }

  const lines = indexContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('//') && !line.startsWith('export {}'))

  lines.push(exportLine.trim())
  const uniqueLines = Array.from(new Set(lines))
  uniqueLines.sort((a, b) => a.localeCompare(b))

  const header = `// Re-export UI components from here as they are implemented.\n`
  const body = uniqueLines.map((line) => `${line};`).join('\n')

  await fs.writeFile(indexPath, `${header}\n${body}\n`, 'utf8')

  console.log(`✔ Created ${componentName} in ${path.relative(projectRoot, componentDir)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
