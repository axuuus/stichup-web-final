import React, { useEffect } from 'react';
import { Gamepad2, Users, Trophy, Sparkles, Shield, Code, Shirt, Megaphone, Fan } from 'lucide-react';

  useEffect(() => {
    document.title = "StichUp | Home";

const features = [
  {
    title: "Premium Knowledge",
    description: "Experience top-tier knowledge with optimized price and exclusive content access.",
    icon: Shirt
  },
  {
    title: "Experienced Team",
    description: "Join our team of experienced designers and logisticians in the garment industry.",
    icon: Users
  },
  {
    title: "Brand Events",
    description: "We can prepare your clothing company's event for you at the best price in the market.",
    icon: Fan
  },
  {
    title: "Unique Manufacturers",
    description: "Get access to state-of-the-art features, tools and a database of specially selected manufactures.",
    icon: Sparkles
  },
  {
    title: "Secure Platform",
    description: "Your data and privacy are protected with state-of-the-art security measures.",
    icon: Shield
  },
  {
    title: "How To Join?",
    description: "To Join contact us in the contact section. Our team will contact you as soon as possible.",
    icon: Megaphone
  }
];

const Index: React.FC = () => {
  useEffect(() => {
    document.title = "StichUp | Home";
  }, []);

  return (
    <div className="relative min-h-screen pt-[8.5rem] pb-16 px-6 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 grid-background"></div>
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="space-y-2 mb-12">
          <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-2 animate-slide-in backdrop-blur-sm">
            WELCOME TO STICHUP
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="glow-text">The ultimate clothing brand experience</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mt-4 mx-auto">
            Join our exclusive community and discover how to manage your own clothing brand.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group"
            >
              <div className="flex flex-col items-center">
                <feature.icon className="w-8 h-8 mb-4 text-primary/60 group-hover:text-primary/80 transition-colors" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
