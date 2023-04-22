import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import { Layout } from 'UI/Layout'
import { ArmorsDebug } from 'Debug/ArmorsDebug'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <ArmorsDebug />
    </Layout>
  </React.StrictMode>,
)
