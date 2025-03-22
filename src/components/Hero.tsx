
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-transparent -z-10" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yIDJoNCB2NEgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 -z-10" />
      
      <div className="container mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full text-primary/90 font-medium animate-fade-in-left">
              Professional AC Services in Dubai
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance leading-tight">
              <span className="animate-fade-in-left inline-block" style={{ animationDelay: '0.1s' }}>Exceptional </span>
              <span className="text-primary animate-fade-in-left inline-block" style={{ animationDelay: '0.2s' }}>Air Conditioning </span>
              <span className="animate-fade-in-left inline-block" style={{ animationDelay: '0.3s' }}>Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
              Experience premium cooling solutions tailored for Dubai's elite properties and businesses. Our expert services deliver comfort with exceptional precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-left" style={{ animationDelay: '0.5s' }}>
              <Button size="lg" className="button-shine group">
                Book Service
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Services
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '500+', label: 'Projects Completed' },
                { value: '99%', label: 'Satisfaction Rate' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
            <div className="aspect-square md:aspect-auto md:h-[500px] relative rounded-2xl overflow-hidden glass-card animate-scale-in" style={{ transformOrigin: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-white/60 mix-blend-overlay" />
              <img 
                src="https://images.unsplash.com/photo-1561998338-13ad7883b20f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
                alt="Luxury air conditioning installation"
                className="object-cover h-full w-full scale-[1.01] opacity-90"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute top-8 -left-8 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Floating card on the image */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 md:right-auto md:max-w-[260px] glass-card bg-white/90 p-4 rounded-xl shadow-lg animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Smart Cooling</h3>
                    <p className="text-xs text-foreground/70 mt-1">Premium solutions with advanced technology and energy efficiency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
