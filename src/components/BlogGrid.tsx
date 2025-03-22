
import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';

const BlogGrid = () => {
  const blogs = [
    {
      id: '1',
      title: 'Top 7 AC Maintenance Tips for Dubai Summer',
      excerpt: 'Discover essential maintenance practices to keep your AC running efficiently during Dubai\'s intense summer heat.',
      image: 'https://images.unsplash.com/photo-1611072548855-926fb6456a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      date: 'Jun 15, 2023',
      author: {
        name: 'Ahmed Hassan',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
      },
      readTime: '5 min'
    },
    {
      id: '2',
      title: 'Energy-Efficient Cooling: The Future of AC Technology',
      excerpt: 'Explore how modern AC systems are becoming more energy-efficient while delivering superior cooling performance.',
      image: 'https://images.unsplash.com/photo-1596394723269-b2cbca4e6e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      date: 'May 22, 2023',
      author: {
        name: 'Sophia White',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80'
      },
      readTime: '7 min'
    },
    {
      id: '3',
      title: 'Why Regular AC Servicing Is Essential for Luxury Properties',
      excerpt: 'Learn why premium properties in Dubai require specialized air conditioning maintenance for optimal performance.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      date: 'Apr 10, 2023',
      author: {
        name: 'Omar Farooq',
        avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1634&q=80'
      },
      readTime: '4 min'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full text-primary/90 font-medium animate-fade-in">
            Our Blog
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Latest Insights & News
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Stay informed with our expert advice on air conditioning maintenance, energy efficiency, and indoor comfort solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              date={blog.date}
              author={blog.author}
              readTime={blog.readTime}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="animate-fade-in-up button-shine">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
