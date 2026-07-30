// Site-wide configuration (ported from the Claude Design component props)
export const config = {
  // One form submission unlocks all papers (vs per-paper)
  unlockAll: true,
  whatsappNumber: '919834226279',
  // Apps Script Web App URL that receives every form submission (see
  // google-apps-script.js). Baked in here — not the /admin CMS setting —
  // because that setting lives in browser localStorage and would only work
  // for whoever's browser configured it, not real site visitors.
  googleSheetsUrl: 'https://script.google.com/macros/s/AKfycbyDBOS8bLIuWwkAzxc0UFJ9bsx0zeWOSk5I2dZfkV98Vpz_uvB6yf-5m6xvaJzINUs4/exec',
}

export const waLink =
  'https://wa.me/' +
  config.whatsappNumber.replace(/[^0-9]/g, '') +
  '?text=' +
  encodeURIComponent('Hi DEXAM, I would like guidance on design entrance exam preparation.')
