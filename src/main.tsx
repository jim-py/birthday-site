import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MusicPlaylistBlock from './AppMusic.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MusicPlaylistBlock />
  </StrictMode>,
)
