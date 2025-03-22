
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BlogGrid from '@/components/BlogGrid';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 mt-16">
        <h1 className="text-4xl font-bold mb-6">Our Blog</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          Stay up to date with the latest news, tips, and insights about air conditioning solutions in Dubai.
        </p>
        
        <BlogGrid />
      </div>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Blog;
