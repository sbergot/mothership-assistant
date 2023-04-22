import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Layout } from './UI/Layout'
import { LoadoutsDebug } from 'Debug/LoadoutsDebug'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <LoadoutsDebug />
    </Layout>
  </React.StrictMode>,
)
