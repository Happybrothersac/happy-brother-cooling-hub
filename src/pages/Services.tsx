
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 mt-16">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          We provide comprehensive air conditioning solutions for residential and commercial properties in Dubai.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-card-scale">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
              <Link 
                to={`/services/${service.slug}`} 
                className="inline-flex items-center text-primary font-medium text-sm group"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

// Sample services data
const services = [
  {
    title: "AC Installation",
    description: "Professional installation of new air conditioning systems for residential and commercial properties.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    slug: "installation"
  },
  {
    title: "AC Maintenance",
    description: "Regular maintenance services to ensure your AC units operate at peak efficiency.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
    slug: "maintenance"
  },
  {
    title: "AC Repair",
    description: "Quick and reliable repair services for all types of air conditioning systems.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
    slug: "repair"
  },
  {
    title: "AC Replacement",
    description: "Expert consultation and replacement services for outdated or inefficient AC systems.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    slug: "replacement"
  },
  {
    title: "Emergency Services",
    description: "24/7 emergency AC repair services for urgent situations.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    slug: "emergency"
  },
  {
    title: "Consultation",
    description: "Professional advice on the best AC solutions for your specific needs.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    slug: "consultation"
  }
];

export default Services;
