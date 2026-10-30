import { copyFile, mkdir, readFile } from 'node:fs/promises'

const output = new URL('../dist/', import.meta.url)
const routes = [
  'about',
  'courses',
  'exams',
  'guide',
  'papers',
  'papers/nid',
  'papers/uceed',
  'papers/nift',
  'papers/nata',
  'papers/ceed',
  'quiz',
  'results',
  'contact',
  'privacy',
  'terms',
]

await readFile(new URL('index.html', output), 'utf8')

for (const route of routes) {
  const directory = new URL(`${route}/`, output)
  await mkdir(directory, { recursive: true })
  await copyFile(new URL('index.html', output), new URL('index.html', directory))
}

console.log(`Prepared ${routes.length} direct-entry routes in dist/.`)
