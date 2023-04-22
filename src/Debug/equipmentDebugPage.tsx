import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import { EquipmentsDebug } from 'Debug/EquipmentsDebug'
import { Layout } from 'UI/Layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <EquipmentsDebug />
    </Layout>
  </React.StrictMode>,
)
