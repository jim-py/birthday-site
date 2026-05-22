import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './AppLetter.tsx'

const root = createRoot(document.getElementById('root')!)

function Root() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true)
    })

    return () => cancelAnimationFrame(id)
  }, [])

  if (!ready) return null

  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

root.render(<Root />)