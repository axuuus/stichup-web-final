import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "StichUp | Page Not Found";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen pt-[22.5rem] pb-16 px-6 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 grid-background"></div>
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="space-y-2 mb-12">
          <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-2 animate-slide-in backdrop-blur-sm">
            404 ERROR
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-4 mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            className="bg-secondary/30 backdrop-blur-sm border-secondary/50 hover:bg-secondary/50 w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          
          <Button
            className="w-full sm:w-auto"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
