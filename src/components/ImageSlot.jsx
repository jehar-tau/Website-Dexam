import { useEffect, useState } from 'react'
import { useCms } from '../cms.jsx'

// Renders an image if src is provided and loads, otherwise a labelled
// placeholder box (mirrors the Claude Design image-slot component).
export default function ImageSlot({ slotId, src, alt = '', placeholder, radius = 0, height, imgStyle }) {
  const cms = useCms()
  const finalSrc = (slotId && cms?.images?.[slotId]) || src
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [finalSrc])
  const style = { borderRadius: radius, overflow: 'hidden', height: height || '100%' }
  return (
    <div className="img-slot" style={style}>
      {finalSrc && !failed
        ? <img src={finalSrc} alt={alt} style={imgStyle} onError={() => setFailed(true)} />
        : <span>{placeholder}</span>}
    </div>
  )
}
