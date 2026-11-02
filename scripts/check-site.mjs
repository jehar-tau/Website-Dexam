import assert from 'node:assert/strict'
import { publicPaths, canonicalFor } from '../src/site/routes.js'

const origin = (process.env.SITE_ORIGIN || 'https://designexam.com').replace(/\/$/, '')
const local = new URL(origin).hostname !== 'designexam.com'
const targets = new Set(['/robots.txt', '/sitemap.xml'])
const pages = new Map()
let failures = 0
async function inspect(pathname) {
  try {
    const response = await fetch(`${origin}${pathname}`, {
      redirect: 'manual', signal: AbortSignal.timeout(20000),
    })
    if (publicPaths.includes(pathname) && pathname !== '/') {
      assert.ok([301, 308].includes(response.status), `HTTP ${response.status}`)
      assert.equal(response.headers.get('location'), `${origin}${pathname}/`)
      console.log(`PASS canonical route redirect ${pathname}`)
      return
    }
    assert.equal(response.status, 200, `HTTP ${response.status}`)
    const type = response.headers.get('content-type') || ''
    if (pathname.endsWith('/') || pathname === '/robots.txt' || pathname === '/sitemap.xml') {
      const body = await response.text()
      if (pathname.endsWith('/')) {
        assert.match(type, /text\/html/)
        const route = pathname === '/' ? '/' : pathname.slice(0, -1)
        assert.ok(body.includes(`rel="canonical" href="${canonicalFor(route)}"`), 'Canonical mismatch')
        if (route !== '/quiz') assert.match(body, /<h1[\s>]/, 'Missing rendered heading')
        pages.set(pathname, body)
      } else pages.set(pathname, body)
    } else {
      assert.ok(!type.includes('text/html'), `Asset returned HTML: ${type}`)
      const bytes = await response.arrayBuffer()
      assert.ok(bytes.byteLength > 0, 'Empty asset')
      if (type.includes('text/css')) {
        for (const match of new TextDecoder().decode(bytes).matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
          const url = new URL(match[1], `${origin}${pathname}`)
          if (url.origin === origin) targets.add(url.pathname)
        }
      }
    }
    console.log(`PASS 200 ${pathname}`)
  } catch (error) {
    failures++
    console.error(`FAIL ${pathname}: ${error.message}`)
  }
}
async function batch(paths) {
  const queue = [...paths]
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (queue.length) await inspect(queue.shift())
  }))
}
const routes = publicPaths.map(path => path === '/' ? '/' : `${path}/`)
await batch(routes)
for (const body of pages.values()) {
  for (const match of body.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), origin)
    if (url.origin === origin || url.origin === 'https://designexam.com') {
      // Public route bodies are already checked; never follow forms or external destinations.
      if (!routes.includes(url.pathname)) targets.add(url.pathname)
    }
  }
}
const inspected = new Set()
while ([...targets].some(path => !inspected.has(path))) {
  const pending = [...targets].filter(path => !inspected.has(path))
  pending.forEach(path => inspected.add(path))
  await batch(pending)
}
try {
  const sitemap = pages.get('/sitemap.xml') || ''
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]).sort()
  assert.deepEqual(locations, publicPaths.map(canonicalFor).sort(), 'Sitemap route inventory mismatch')
  assert.match(pages.get('/robots.txt') || '', /Sitemap: https:\/\/designexam.com\/sitemap.xml/)
  assert.ok(!/^Disallow:\s*\/\s*$/m.test(pages.get('/robots.txt') || ''), 'Crawling blocked')
  console.log('PASS robots policy and complete sitemap')
} catch (error) { failures++; console.error(`FAIL discovery files: ${error.message}`) }
if (!local) {
  for (const url of ['http://designexam.com/', 'https://www.designexam.com/', 'https://designexam.com/courses']) {
    try {
      const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) })
      const expected = url.endsWith('/courses') ? `${origin}/courses/` : `${origin}/`
      assert.ok([301, 308].includes(response.status), `HTTP ${response.status}`)
      assert.equal(response.headers.get('location'), expected)
      console.log(`PASS canonical redirect ${url}`)
    } catch (error) { failures++; console.error(`FAIL redirect ${url}: ${error.message}`) }
  }
}
console.log(`${routes.length} direct routes; ${targets.size} linked assets/discovery files; ${failures} failures. No forms submitted.`)
if (failures) process.exitCode = 1
