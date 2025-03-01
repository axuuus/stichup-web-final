import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Register: React.FC = () => {
  useEffect(() => {
    document.title = "GloryWin Club | Register";
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="space-y-2 mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-2 animate-slide-in">
            JOIN US
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mt-2">
            Register to become part of our exclusive gaming community and unlock premium features.
          </p>
        </div>
        
        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 mt-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Choose a username" 
                className="bg-background/60 border-secondary/50 focus:border-primary/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background/60 border-secondary/50 focus:border-primary/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                className="bg-background/60 border-secondary/50 focus:border-primary/30"
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <Link to="/tos" className="text-primary/80 hover:text-primary transition-colors">Terms of Service</Link> and <Link to="#" className="text-primary/80 hover:text-primary transition-colors">Privacy Policy</Link>
              </Label>
            </div>
            
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Register
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary/80 hover:text-primary transition-colors">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
