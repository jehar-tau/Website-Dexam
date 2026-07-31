import { createContext, useContext, useEffect, useState } from 'react'
import { config } from './config.js'
import { driveDownloadUrl } from './data.js'
import { submitToGoogleSheet } from './cms.jsx'

// Lead-capture flow: papers are locked until the visitor fills the form once
// (config.unlockAll) or per paper. Unlock state persists in localStorage.
// Paper download links come from each paper's fileId (data.js's examPapers),
// baked into the build so they work for every visitor — not from the
// browser-local CMS.

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

const emptyFields = { name: '', phone: '', location: '' }

export function LeadProvider({ children }) {
  const stored = loadStored()
  const [leadCaptured, setLeadCaptured] = useState(!!stored.leadCaptured)
  const [unlockedKeys, setUnlockedKeys] = useState(stored.unlockedKeys || {})
  const [modalPaper, setModalPaper] = useState(null) // { examId, paper } | null; paper is null for the bare "get papers" form
  const [formDone, setFormDone] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [fields, setFields] = useState(emptyFields)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ leadCaptured, unlockedKeys }))
  }, [leadCaptured, unlockedKeys])

  const isUnlocked = (paperId) =>
    !!unlockedKeys[paperId] || (config.unlockAll && leadCaptured)

  const setField = (key, value) => {
    setFields((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: false }))
  }

  const openUnlock = (examId, paper) => {
    setModalPaper({ examId, paper })
    setFormDone(false)
    setDownloaded(false)
    setErrors({})
  }

  const openDownload = (examId, paper) => {
    window.open(driveDownloadUrl(paper.fileId), '_blank')
    setModalPaper({ examId, paper })
    setFormDone(true)
    setDownloaded(false)
  }

  const openLeadForm = () => {
    setModalPaper({ examId: null, paper: null })
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
      paperLabel: modalPaper?.paper?.label || '',
    }).catch(() => {})
    if (modalPaper && modalPaper.paper) {
      setUnlockedKeys((k) => ({ ...k, [modalPaper.paper.id]: true }))
    }
  }

  const downloadNow = () => {
    if (modalPaper && !modalPaper.paper) {
      setModalPaper(null)
      return
    }
    if (modalPaper) {
      window.open(driveDownloadUrl(modalPaper.paper.fileId), '_blank')
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
