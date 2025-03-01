import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, Shield } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const isAdminDashboard = location.pathname === '/admin/dashboard';
  
  useEffect(() => {
    const checkAdminLogin = () => {
      const persistentLogin = localStorage.getItem('persistentAdminLogin');
      setIsAdminLoggedIn(!!persistentLogin);
    };

    checkAdminLogin();
    window.addEventListener('storage', checkAdminLogin);
    return () => window.removeEventListener('storage', checkAdminLogin);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('persistentAdminLogin');
    setIsAdminLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "Successfully logged out from admin panel"
    });
    navigate('/admin');
  };

  return (
    <nav 
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 py-4 px-6 
      rounded-full w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] max-w-5xl
      ${scrolled ? 'bg-nav-bg/95 backdrop-blur-sm shadow-md' : 'bg-nav-bg'}`}
    >
      <div className="flex justify-between items-center">
        <Link 
          to="/" 
          className="font-mono text-nav-text text-xl font-medium tracking-tight hover:opacity-80 transition-opacity"
        >
          {isAdminDashboard ? "StichUp - Admin Mode" : "StichUp"}
        </Link>
        
        {isAdminDashboard ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-nav-text hover:text-destructive flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </Button>
        ) : (
          <>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-nav-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>

              {/* Projects Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="nav-link flex items-center gap-1 focus-visible:outline-none">
                  Our Projects <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-nav-bg/95 backdrop-blur-sm border-secondary/20">
                  <DropdownMenuItem className="text-nav-text hover:text-primary focus:text-primary cursor-pointer">
                    <Link to="/login">Soon..</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-nav-text hover:text-primary focus:text-primary cursor-pointer">
                    <Link to="/projects/soon">Soon..</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link 
                to="/contact" 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                Contact
              </Link>
              <Link 
                to="/tos" 
                className={`nav-link ${location.pathname === '/tos' ? 'active' : ''}`}
              >
                Terms
              </Link>

              {isAdminLoggedIn && !isAdminDashboard && (
                <Link to="/admin/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-nav-text hover:text-primary flex items-center gap-2"
                  >
                    <Shield size={16} />
                    Admin Panel
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            <div className={`
              md:hidden fixed inset-x-0 top-[4.5rem] p-4 bg-nav-bg/95 backdrop-blur-sm
              transition-all duration-300 ease-in-out
              ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
            `}>
              <div className="flex flex-col gap-4">
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                {/* Mobile Projects Menu */}
                <div className="space-y-2">
                  <div className="nav-link font-medium">Our Projects</div>
                  <div className="pl-4 flex flex-col gap-2">
                    <Link 
                      to="/projects/gaming" 
                      className="nav-link text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Soon..
                    </Link>
                    <Link 
                      to="/projects/esports" 
                      className="nav-link text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Soon..
                    </Link>
                  </div>
                </div>

                <Link 
                  to="/contact" 
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/tos" 
                  className={`nav-link ${location.pathname === '/tos' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Terms
                </Link>

                {isAdminLoggedIn && !isAdminDashboard && (
                  <Link 
                    to="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-nav-text hover:text-primary flex items-center gap-2"
                    >
                      <Shield size={16} />
                      Admin Panel
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
