import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import { Layout } from 'UI/Layout'
import { IconsDebug } from './IconsDebug'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <IconsDebug />
    </Layout>
  </React.StrictMode>,
)
