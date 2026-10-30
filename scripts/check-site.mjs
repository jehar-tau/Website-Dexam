const origin = (process.env.SITE_ORIGIN || 'https://designexam.com').replace(/\/$/, '')
const expected = ['/', '/about/', '/courses/', '/papers/', '/robots.txt', '/sitemap.xml']
let failed = false

for (const pathname of expected) {
  const response = await fetch(`${origin}${pathname}`, { redirect: 'manual' })
  const pass = response.status === 200
  console.log(`${pass ? 'PASS' : 'FAIL'} ${response.status} ${pathname}`)
  failed ||= !pass
}

const wwwResponse = await fetch(`https://www.designexam.com/`, { redirect: 'manual' })
const wwwLocation = wwwResponse.headers.get('location') || ''
const wwwPass = [301, 302, 307, 308].includes(wwwResponse.status) &&
  wwwLocation.startsWith('https://designexam.com/')
console.log(`${wwwPass ? 'PASS' : 'FAIL'} ${wwwResponse.status} www → ${wwwLocation || '(missing)'}`)
failed ||= !wwwPass

if (failed) process.exitCode = 1
