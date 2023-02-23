import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Layout } from './Layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
)
