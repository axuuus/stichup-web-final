import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Index from './pages/Index'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Tos from './pages/Tos'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import { recordVisit } from './lib/utils'

function App() {
  const location = useLocation();

  useEffect(() => {
    recordVisit(location.pathname);
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
