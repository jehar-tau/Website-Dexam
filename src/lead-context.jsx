import { createContext, useContext, useEffect, useState } from 'react'
import { config } from './config.js'
import { readCmsPaperLink, submitToGoogleSheet } from './cms.jsx'

// Lead-capture flow: papers are locked until the visitor fills the form once
// (config.unlockAll) or per paper. Unlock state persists in localStorage.
// Paper download links are read from the DEXAM Admin app's localStorage
// ('dexam-admin-v1' → paperLinks['<examId>-<year>']).

const LeadContext = createContext(null)
export const useLead = () => useContext(LeadContext)

const STORAGE_KEY = 'dexam-lead-v1'

function loadStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export function getAdminLink(examId, year) {
  const cmsLink = readCmsPaperLink(examId + '-' + year)
  if (cmsLink) return cmsLink
  try {
    const raw = localStorage.getItem('dexam-admin-v1')
    if (!raw) return null
    return (JSON.parse(raw).paperLinks || {})[examId + '-' + year] || null
  } catch {
    return null
  }
}

const emptyFields = { name: '', phone: '', location: '' }

export function LeadProvider({ children }) {
  const stored = loadStored()
  const [leadCaptured, setLeadCaptured] = useState(!!stored.leadCaptured)
  const [unlockedKeys, setUnlockedKeys] = useState(stored.unlockedKeys || {})
  const [modalPaper, setModalPaper] = useState(null) // { examId, year } | null
  const [formDone, setFormDone] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [fields, setFields] = useState(emptyFields)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ leadCaptured, unlockedKeys }))
  }, [leadCaptured, unlockedKeys])

  const isUnlocked = (examId, year) =>
    !!unlockedKeys[examId + '-' + year] || (config.unlockAll && leadCaptured)

  const setField = (key, value) => {
    setFields((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: false }))
  }

  const openUnlock = (examId, year) => {
    setModalPaper({ examId, year })
    setFormDone(false)
    setDownloaded(false)
    setErrors({})
  }

  const openDownload = (examId, year) => {
    const link = getAdminLink(examId, year)
    if (link) window.open(link, '_blank')
    setModalPaper({ examId, year })
    setFormDone(true)
    setDownloaded(false)
  }

  const openLeadForm = () => {
    setModalPaper({ examId: null, year: null })
    setFormDone(false)
    setDownloaded(false)
    setErrors({})
  }

  const closeModal = () => setModalPaper(null)

  const validate = () => ({
    name: fields.name.trim().length < 2,
    phone: !/^[0-9]{10}$/.test(fields.phone.replace(/[\s-]/g, '')),
    location: fields.location.trim().length < 2,
  })

  const submitForm = async () => {
    const errs = validate()
    if (Object.values(errs).some(Boolean)) {
      setErrors(errs)
      return
    }
    setErrors({})
    setFormDone(true)
    setLeadCaptured(true)
    submitToGoogleSheet('paper_download', {
      ...fields,
      examId: modalPaper?.examId || '',
      paperYear: modalPaper?.year || '',
    }).catch(() => {})
    if (modalPaper && modalPaper.year) {
      setUnlockedKeys((k) => ({ ...k, [modalPaper.examId + '-' + modalPaper.year]: true }))
    }
  }

  const downloadNow = () => {
    if (modalPaper && !modalPaper.year) {
      setModalPaper(null)
      return
    }
    if (modalPaper) {
      const link = getAdminLink(modalPaper.examId, modalPaper.year)
      if (link) window.open(link, '_blank')
    }
    setDownloaded(true)
  }

  return (
    <LeadContext.Provider
      value={{
        leadCaptured, isUnlocked, modalPaper, formDone, downloaded,
        fields, errors, setField,
        openUnlock, openDownload, openLeadForm, closeModal, submitForm, downloadNow,
      }}
    >
      {children}
    </LeadContext.Provider>
  )
}
