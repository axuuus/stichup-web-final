import React, { useEffect } from 'react';

const Tos: React.FC = () => {
  useEffect(() => {
    document.title = "StichUp | Terms of Service";
  }, []);

  return (
    <div className="relative min-h-screen pt-[8.5rem] pb-16 px-6 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 grid-background"></div>
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="space-y-2 mb-12">
          <div className="inline-block px-3 py-1 bg-secondary/50 text-xs text-primary/80 rounded-full mb-2 animate-slide-in backdrop-blur-sm">
            LEGAL
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-md mt-4">
            Last updated: Febuary 27, 2025
          </p>
        </div>
        
        <div className="space-y-8 mt-12 text-left">
          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to StichUp! By accessing and using our website (www.stichup.pl), you agree to comply with the following Terms and Conditions. If you do not agree, please refrain from using our Site.
            </p>
          </section>
          
          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">2. General Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              StichUp provides a contact form for users to reach out to us. The Site does not offer products, services, or transactions.
            </p>
          </section>
          
          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">3. Use of the Contact Form</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to provide accurate and truthful information when using the contact form. 
              Any abusive, unlawful, or spam-related submissions are strictly prohibited. 
              We reserve the right to ignore or delete messages that violate these Terms.
            </p>
          </section>
          
          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">4. Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your contact details submitted through the form will be used solely for communication purposes. We do not sell or share your information with third parties. For more details, please refer to our Privacy Policy.
            </p>
          </section>
          
          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on the Site, including text, graphics, logos, and design, is the property of StichUp and may not be copied, modified, or distributed without permission.
            </p>
          </section>
          
          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain an error-free and secure Site, but we do not guarantee uninterrupted or flawless operation. StichUp is not liable for any damages resulting from the use of the Site.
            </p>
          </section>

          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">7. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Updates will be posted on this page with a revised effective date.
            </p>
          </section>

          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of Poland. Any disputes will be resolved in the appropriate courts of this jurisdiction.
            </p>
          </section>

          <section className="space-y-4 bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-primary/30">
            <h2 className="text-xl font-semibold tracking-tight text-center">Any Questions?</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions regarding these Terms, please contact us via the contact form on our Site.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default Tos;
