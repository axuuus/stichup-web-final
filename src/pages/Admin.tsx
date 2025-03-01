import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "StichUp | Admin";
    
    // Check for persistent login
    const persistentLogin = localStorage.getItem('persistentAdminLogin');
    if (persistentLogin === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email === 'contact@stichup.pl' && formData.password === 'Anastazja9999') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      if (rememberMe) {
        localStorage.setItem('persistentAdminLogin', 'true');
      }
      toast({
        title: "Success",
        description: "Successfully logged in as admin",
      });
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative min-h-screen pt-[8.5rem] pb-16 px-6 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 grid-background"></div>
      <div className="relative max-w-md mx-auto">
        <div className="space-y-2 mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-2 animate-slide-in backdrop-blur-sm">
            ADMIN PANEL
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Login
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-2">
            Enter your admin credentials to access the dashboard.
          </p>
        </div>
        
        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-100/10 border border-red-200/20 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter admin email" 
                className={`bg-background/60 border-secondary/50 focus:border-primary/30 ${error ? 'border-red-500/50' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter admin password" 
                className={`bg-background/60 border-secondary/50 focus:border-primary/30 ${error ? 'border-red-500/50' : ''}`}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rememberMe" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
            
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Login to Admin
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
