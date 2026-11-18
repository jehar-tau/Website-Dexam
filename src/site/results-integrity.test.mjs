import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const [data, results, terms] = await Promise.all([
  readFile(new URL('../data.js', import.meta.url), 'utf8'),
  readFile(new URL('../pages/Results.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../pages/Terms.jsx', import.meta.url), 'utf8'),
])

test('public outcomes stay behind evidence and student-permission gates', () => {
  assert.doesNotMatch(data, /export const testimonials\s*=/)
  assert.match(results, /supporting records/)
  assert.match(results, /student’s permission/)
  assert.match(terms, /checked against supporting records/)
  assert.match(terms, /student\\'s permission/)
  assert.match(terms, /do not guarantee any rank, score or admission/)
})
