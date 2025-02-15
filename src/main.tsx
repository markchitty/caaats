import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cats from './Cats.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Cats />
  </StrictMode>
)
