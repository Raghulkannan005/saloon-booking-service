import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Services from './pages/Services'
import Bookings from './pages/Bookings'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
