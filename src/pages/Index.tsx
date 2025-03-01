import { useEffect, useState } from 'react'
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
import LoadingScreen from './components/LoadingScreen'
import { recordVisit } from './lib/utils'
function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    recordVisit(location.pathname);
  }, [location]);
  useEffect(() => {

    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
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
