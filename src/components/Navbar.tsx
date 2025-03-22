
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-display font-bold tracking-tight text-primary flex items-center space-x-2 animate-fade-in"
          >
            <span>HappyBrother</span>
            <span className="text-foreground">AC</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {['Home', 'Services', 'Blog', 'About', 'Contact'].map((item, index) => (
                <li key={item} className={`animate-fade-in-down`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Button 
              className="animate-fade-in-down button-shine" 
              style={{ animationDelay: '0.5s' }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Book Service
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 animate-scale-in" />
            ) : (
              <Menu className="h-6 w-6 animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] bg-background/98 backdrop-blur-md z-40 md:hidden animate-fade-in">
          <div className="container mx-auto px-6 py-8">
            <ul className="flex flex-col space-y-6">
              {['Home', 'Services', 'Blog', 'About', 'Contact'].map((item, index) => (
                <li key={item} className="animate-fade-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-xl font-medium block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button 
                className="w-full button-shine animate-fade-in-up" 
                style={{ animationDelay: '0.5s' }}
              >
                <Phone className="mr-2 h-4 w-4" />
                Book Service
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
