
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, link, delay = 0 }: ServiceCardProps) => {
  return (
    <div 
      className="glass-card rounded-xl p-6 hover-card-scale animate-fade-in-up" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      <Link 
        to={link} 
        className="inline-flex items-center text-primary font-medium text-sm group"
      >
        Learn more
        <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default ServiceCard;
