import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WeddingInvitation from './components/WeddingInvitation'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
           <WeddingInvitation
           names={["Matheus", "Isabela"]}
           date="Sexta-feira, 12 de Junho, 2026"
           location="Vip festas - Caetanópolis/MG"
         />
        } />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
