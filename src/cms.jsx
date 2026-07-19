import { createContext, useContext, useEffect, useState } from 'react'

const SETTINGS_KEY = 'dexam-cms-v1'
const DB_NAME = 'dexam-cms-assets'
const STORE = 'images'

const CmsContext = createContext(null)

export const imageSlots = [
  ...['interior', 'fashion', 'communication', 'industrial', 'graphic'].map((name, i) => ({ id: `hero-${i + 1}`, label: `Hero — ${name} design`, group: 'Home hero' })),
  ...[1, 2, 3].map((n) => ({ id: `mentor-${n}`, label: `Mentor photo ${n}`, group: 'Mentors' })),
  { id: 'about-studio', label: 'Studio / classroom', group: 'About' },
  { id: 'about-student-work', label: 'Student work', group: 'About' },
  ...[1, 2, 3].map((n) => ({ id: `work-${n}`, label: `Student work ${n}`, group: 'Results' })),
]

export const baseLinks = [
  { id: 'whatsapp', label: 'WhatsApp', value: 'https://wa.me/919834226279?text=Hi%20DEXAM%2C%20I%20would%20like%20guidance%20on%20design%20entrance%20exam%20preparation.' },
  { id: 'email', label: 'Email', value: 'mailto:inquiry@designexam.com' },
]

function readSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { links: {}, paperLinks: {} } }
  catch { return { links: {}, paperLinks: {} } }
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getAllImages() {
  const db = await openDb()
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly')
    const request = tx.objectStore(STORE).getAllKeys()
    request.onsuccess = async () => {
      const entries = await Promise.all(request.result.map((key) => new Promise((done) => {
        const r = db.transaction(STORE, 'readonly').objectStore(STORE).get(key)
        r.onsuccess = () => done([key, r.result])
      })))
      resolve(Object.fromEntries(entries))
    }
  })
}

export function CmsProvider({ children }) {
  const [settings, setSettings] = useState(readSettings)
  const [images, setImages] = useState({})
  useEffect(() => {
    const refresh = () => getAllImages().then(setImages).catch(() => {})
    refresh()
    const channel = new BroadcastChannel('dexam-cms')
    channel.onmessage = (event) => {
      if (event.data === 'images') refresh()
      if (event.data === 'settings') setSettings(readSettings())
    }
    const syncSettings = (event) => { if (event.key === SETTINGS_KEY) setSettings(readSettings()) }
    window.addEventListener('storage', syncSettings)
    return () => { channel.close(); window.removeEventListener('storage', syncSettings) }
  }, [])
  useEffect(() => { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)) }, [settings])
  useEffect(() => {
    const applyLinks = () => {
      const whatsapp = settings.links?.whatsapp
      const email = settings.links?.email
      document.querySelectorAll('a[href]').forEach((anchor) => {
        const href = anchor.getAttribute('href') || ''
        if (whatsapp && (href.startsWith('https://wa.me/') || anchor.dataset.cmsLink === 'whatsapp')) {
          anchor.href = whatsapp; anchor.dataset.cmsLink = 'whatsapp'
        }
        if (email && (href.startsWith('mailto:') || anchor.dataset.cmsLink === 'email')) {
          anchor.href = email; anchor.dataset.cmsLink = 'email'
        }
      })
    }
    applyLinks()
    const observer = new MutationObserver(applyLinks)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [settings.links])

  const saveImage = async (id, dataUrl) => {
    const db = await openDb()
    await new Promise((resolve, reject) => {
      const request = db.transaction(STORE, 'readwrite').objectStore(STORE).put(dataUrl, id)
      request.onsuccess = resolve; request.onerror = () => reject(request.error)
    })
    setImages((old) => ({ ...old, [id]: dataUrl }))
    const channel = new BroadcastChannel('dexam-cms'); channel.postMessage('images'); channel.close()
  }
  const removeImage = async (id) => {
    const db = await openDb()
    db.transaction(STORE, 'readwrite').objectStore(STORE).delete(id)
    setImages((old) => { const next = { ...old }; delete next[id]; return next })
    const channel = new BroadcastChannel('dexam-cms'); channel.postMessage('images'); channel.close()
  }
  const saveSection = (key, value) => {
    const next = { ...settings, [key]: value }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
    setSettings(next)
    const channel = new BroadcastChannel('dexam-cms'); channel.postMessage('settings'); channel.close()
  }
  const link = (id, fallback = '#') => settings.links?.[id] || fallback

  return <CmsContext.Provider value={{ images, settings, saveImage, removeImage, saveLinks: (v) => saveSection('links', v), savePaperLinks: (v) => saveSection('paperLinks', v), saveGoogleSheetsUrl: (v) => saveSection('googleSheetsUrl', v), link }}>{children}</CmsContext.Provider>
}

export const useCms = () => useContext(CmsContext)

export function readCmsPaperLink(id) {
  return readSettings().paperLinks?.[id] || null
}

export async function submitToGoogleSheet(type, fields) {
  const url = readSettings().googleSheetsUrl
  if (!url) return { configured: false }
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ type, submittedAt: new Date().toISOString(), page: window.location.href, ...fields }),
  })
  return { configured: true }
}
