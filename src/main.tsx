import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import AppLetter from './AppLetter'
import AppMain from './AppMain'
import MusicPlaylistBlock from './AppMusic'
import WishlistItem from './AppWishlist'
import AppFood from './AppFood'
import AppProfile from './AppProfile'
import Error404 from './Funny404'

const routes = [
  { path: '/home/:id', element: <AppMain /> },
  { path: '/music/:id', element: <MusicPlaylistBlock /> },
  { path: '/wishlist/:id', element: <WishlistItem /> },
  { path: '/food/:id', element: <AppFood /> },
  { path: '/profile/:id', element: <AppProfile /> },
]

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root not found')

const root = createRoot(rootEl)

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
    <BrowserRouter>
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}

        <Route path="/:id" element={<AppLetter />} />
        
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
  )
}

root.render(<Root />)