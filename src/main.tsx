import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Login/components/App.tsx'
import './index.css'

import './lib/i18n'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)