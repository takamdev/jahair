import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'sonner'
import Root from './Root.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-center' />
    <Root/>
  </StrictMode>,
)
