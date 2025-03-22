
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  delay?: number;
}

const BlogCard = ({ id, title, excerpt, image, date, author, readTime, delay = 0 }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${id}`} 
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="glass-card rounded-xl overflow-hidden hover-card-scale">
        <div className="aspect-[16/9] relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="h-6 w-6 rounded-full overflow-hidden">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm text-foreground/70">
              {author.name}
            </span>
          </div>
          
          <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-foreground/60">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readTime} read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
