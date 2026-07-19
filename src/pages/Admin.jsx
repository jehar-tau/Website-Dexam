import { useEffect, useMemo, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import { examData, paperYears } from '../data.js'
import { baseLinks, imageSlots, useCms } from '../cms.jsx'

function cropImage(src, crop, size) {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const max = 1600
      const scale = Math.min(1, max / Math.max(size.width, size.height))
      canvas.width = Math.round(size.width * scale); canvas.height = Math.round(size.height * scale)
      canvas.getContext('2d').drawImage(image, crop.x, crop.y, size.width, size.height, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', .9))
    }
    image.src = src
  })
}

function ImageEditor({ slot, onClose }) {
  const cms = useCms()
  const input = useRef()
  const [source, setSource] = useState(cms.images[slot.id] || '')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [pixels, setPixels] = useState(null)
  const choose = (file) => { if (file) { const r = new FileReader(); r.onload = () => setSource(r.result); r.readAsDataURL(file) } }
  const save = async () => { if (source && pixels) { await cms.saveImage(slot.id, await cropImage(source, pixels, pixels)); onClose() } }
  return <div className="cms-modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="cms-editor">
      <div className="cms-editor-head"><div><b>{slot.label}</b><span>Upload, crop, zoom and reposition</span></div><button onClick={onClose}>×</button></div>
      {!source ? <button className="cms-drop" onClick={() => input.current.click()}>Choose an image from your computer</button> : <>
        <div className="cms-crop"><Cropper image={source} crop={crop} zoom={zoom} aspect={slot.id.startsWith('hero-') ? 1 : 4 / 3} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={(_, p) => setPixels(p)} /></div>
        <label className="cms-range">Zoom <input type="range" min="1" max="3" step=".01" value={zoom} onChange={(e) => setZoom(+e.target.value)} /></label>
      </>}
      <input ref={input} hidden type="file" accept="image/*" onChange={(e) => choose(e.target.files[0])} />
      <div className="cms-actions"><button className="btn btn--outline-ink" onClick={() => input.current.click()}>{source ? 'Replace image' : 'Choose image'}</button><button className="btn btn--orange" disabled={!source} onClick={save}>Save image</button></div>
    </div>
  </div>
}

export default function Admin() {
  const cms = useCms()
  const [tab, setTab] = useState('images')
  const [editing, setEditing] = useState(null)
  const [linkDrafts, setLinkDrafts] = useState({})
  const [paperDrafts, setPaperDrafts] = useState({})
  const [saved, setSaved] = useState('')
  const [sheetsUrl, setSheetsUrl] = useState('')
  useEffect(() => {
    setLinkDrafts(Object.fromEntries(baseLinks.map((item) => [item.id, cms.settings.links?.[item.id] ?? item.value])))
    setPaperDrafts(cms.settings.paperLinks || {})
    setSheetsUrl(cms.settings.googleSheetsUrl || '')
  }, [cms.settings])
  const confirmSave = (section) => {
    if (section === 'links') cms.saveLinks(linkDrafts)
    if (section === 'downloads') cms.savePaperLinks(paperDrafts)
    if (section === 'images') { const c = new BroadcastChannel('dexam-cms'); c.postMessage('images'); c.close() }
    if (section === 'sheets') cms.saveGoogleSheetsUrl(sheetsUrl)
    setSaved(section)
    setTimeout(() => setSaved(''), 2200)
  }
  const paperRows = useMemo(() => examData.flatMap((e) => paperYears.map((year) => ({ id: `${e.id}-${year}`, label: `${e.name} — ${year}` }))), [])
  return <div className="cms-page">
    <div className="cms-hero"><div><span>DEXAM CMS</span><h1>Website content manager</h1><p>Manage every website image and destination from one place.</p></div><a className="btn btn--white" href="/" target="_blank">View website ↗</a></div>
    <div className="cms-shell">
      <div className="cms-tabs"><button className={tab === 'images' ? 'active' : ''} onClick={() => setTab('images')}>Images</button><button className={tab === 'links' ? 'active' : ''} onClick={() => setTab('links')}>Website links</button><button className={tab === 'downloads' ? 'active' : ''} onClick={() => setTab('downloads')}>Paper downloads</button><button className={tab === 'sheets' ? 'active' : ''} onClick={() => setTab('sheets')}>Google Sheets</button></div>
      {tab === 'images' && <><div className="cms-grid">{imageSlots.map((slot) => <div className="cms-image-card" key={slot.id}>
        <div className="cms-thumb">{cms.images[slot.id] ? <img src={cms.images[slot.id]} alt="" /> : <span>No custom image</span>}</div>
        <small>{slot.group}</small><b>{slot.label}</b><div><button onClick={() => setEditing(slot)}>{cms.images[slot.id] ? 'Edit / recrop' : 'Upload image'}</button>{cms.images[slot.id] && <button className="danger" onClick={() => cms.removeImage(slot.id)}>Remove</button>}</div>
      </div>)}</div><div className="cms-savebar"><span>{saved === 'images' ? 'Images saved and synced to the website.' : 'Finished editing images?'}</span><button className="btn btn--orange" onClick={() => confirmSave('images')}>Save image page</button></div></>}
      {tab === 'links' && <div className="cms-form-list"><div className="cms-note">Paste a full website URL, WhatsApp link, email link, or any other destination. Changes apply to matching buttons across the website.</div>{baseLinks.map((item) => <label key={item.id}><span>{item.label}</span><input value={linkDrafts[item.id] || ''} onChange={(e) => setLinkDrafts((old) => ({ ...old, [item.id]: e.target.value }))} /></label>)}<div className="cms-savebar"><span>{saved === 'links' ? 'Website links saved and synced.' : 'Changes remain drafts until you save.'}</span><button className="btn btn--orange" onClick={() => confirmSave('links')}>Save website links</button></div></div>}
      {tab === 'downloads' && <div className="cms-form-list"><div className="cms-note">Add a direct file or cloud-storage link for every paper. Visitors receive this link after unlocking the download.</div>{paperRows.map((item) => <label key={item.id}><span>{item.label}</span><input placeholder="https://…" value={paperDrafts[item.id] || ''} onChange={(e) => setPaperDrafts((old) => ({ ...old, [item.id]: e.target.value }))} /></label>)}<div className="cms-savebar"><span>{saved === 'downloads' ? 'PDF download links saved and synced.' : 'Changes remain drafts until you save.'}</span><button className="btn btn--orange" onClick={() => confirmSave('downloads')}>Save PDF downloads</button></div></div>}
      {tab === 'sheets' && <div className="cms-form-list"><div className="cms-note"><b>Google Sheets connection</b><br />Create the Apps Script using the included setup file, deploy it as a Web App, and paste its deployment URL below. Paper forms will go to “Paper Downloads”; counselling forms will go to “Counselling”.</div><label><span>Apps Script Web App URL</span><input placeholder="https://script.google.com/macros/s/…/exec" value={sheetsUrl} onChange={(e) => setSheetsUrl(e.target.value)} /></label><div className="cms-savebar"><span>{saved === 'sheets' ? 'Google Sheets connection saved.' : 'The connection activates after saving.'}</span><button className="btn btn--orange" onClick={() => confirmSave('sheets')}>Save Google Sheets connection</button></div></div>}
    </div>
    {editing && <ImageEditor slot={editing} onClose={() => setEditing(null)} />}
  </div>
}
