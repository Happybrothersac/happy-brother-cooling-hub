
import { AirVent, RotateCw, Settings, Zap, ThermometerSnowflake, Shield } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const services = [
    {
      title: 'AC Installation',
      description: 'Professional installation of high-efficiency air conditioning systems for residential and commercial properties.',
      icon: <AirVent className="h-6 w-6" />,
      link: '/services/installation'
    },
    {
      title: 'AC Maintenance',
      description: 'Regular maintenance services to ensure optimal performance and extend the lifespan of your AC units.',
      icon: <RotateCw className="h-6 w-6" />,
      link: '/services/maintenance'
    },
    {
      title: 'AC Repair',
      description: 'Quick and reliable repair services to fix any issues with your air conditioning system.',
      icon: <Settings className="h-6 w-6" />,
      link: '/services/repair'
    },
    {
      title: 'Emergency Services',
      description: '24/7 emergency AC repair services for urgent situations and critical cooling needs.',
      icon: <Zap className="h-6 w-6" />,
      link: '/services/emergency'
    },
    {
      title: 'AC Retrofitting',
      description: 'Upgrade your existing AC system to modern, energy-efficient technology for better performance.',
      icon: <ThermometerSnowflake className="h-6 w-6" />,
      link: '/services/retrofitting'
    },
    {
      title: 'Annual Contracts',
      description: 'Comprehensive maintenance contracts with priority service and exclusive benefits.',
      icon: <Shield className="h-6 w-6" />,
      link: '/services/contracts'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/30 to-transparent -z-10" />
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full text-primary/90 font-medium animate-fade-in">
            Our Premium Services
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Comprehensive Air Conditioning Solutions
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We offer a complete range of premium services to meet all your air conditioning needs, from installation to maintenance and repairs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              link={service.link}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="animate-fade-in-up button-shine">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
