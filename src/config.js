// Site-wide configuration (ported from the Claude Design component props)
export const config = {
  // 'essential' = name/phone/email/class/exam; 'detailed' adds parent name + city
  formVariant: 'detailed',
  // One form submission unlocks all papers (vs per-paper)
  unlockAll: true,
  whatsappNumber: '919834226279',
}

export const waLink =
  'https://wa.me/' +
  config.whatsappNumber.replace(/[^0-9]/g, '') +
  '?text=' +
  encodeURIComponent('Hi DEXAM, I would like guidance on design entrance exam preparation.')
