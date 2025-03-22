
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="text-2xl font-display font-bold tracking-tight text-primary flex items-center space-x-2 mb-4">
              <span>HappyBrother</span>
              <span className="text-foreground">AC</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Premium air conditioning solutions for Dubai's most prestigious properties. Delivering comfort with excellence.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="h-4 w-4" />, href: "#" },
                { icon: <Instagram className="h-4 w-4" />, href: "#" },
                { icon: <Twitter className="h-4 w-4" />, href: "#" },
                { icon: <Linkedin className="h-4 w-4" />, href: "#" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-foreground/70 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Social media"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                { name: 'AC Installation', href: '/services/installation' },
                { name: 'AC Maintenance', href: '/services/maintenance' },
                { name: 'AC Repair', href: '/services/repair' },
                { name: 'Emergency Services', href: '/services/emergency' },
                { name: 'Annual Contracts', href: '/services/contracts' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Testimonials', href: '/testimonials' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Privacy Policy', href: '/privacy' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              {[
                { 
                  icon: <Phone className="h-4 w-4" />, 
                  content: '+971 4 123 4567',
                  href: 'tel:+97141234567' 
                },
                { 
                  icon: <Mail className="h-4 w-4" />, 
                  content: 'info@happybrotherac.com',
                  href: 'mailto:info@happybrotherac.com' 
                },
                { 
                  icon: <MapPin className="h-4 w-4" />, 
                  content: 'Sheikh Zayed Road, Dubai, UAE',
                  href: 'https://maps.google.com' 
                }
              ].map((item, index) => (
                <li key={index} className="flex">
                  <div className="text-primary mr-3 mt-1">{item.icon}</div>
                  <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.content}
                  </a>
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full button-shine">Book a Service</Button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Happy Brother Air Conditioning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
