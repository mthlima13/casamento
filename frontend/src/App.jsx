import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WeddingInvitation from './components/WeddingInvitation'
import Dashboard from './components/Dashboard'
import weddingConfig from './config'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingInvitation {...weddingConfig} />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
