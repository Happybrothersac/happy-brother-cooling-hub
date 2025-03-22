
import { useQuery } from "@tanstack/react-query";
import { getPublishedPosts } from "@/lib/supabase";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCard from "@/components/BlogCard";

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['publishedPosts'],
    queryFn: getPublishedPosts
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Blog Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50/80 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full text-primary/90 font-medium animate-fade-in">
              Our Blog
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              HVAC Insights & Expertise
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Stay updated with the latest news, tips, and insights on air conditioning, maintenance, and indoor air quality.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8">
              <p className="text-destructive">Failed to load blog posts. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    image="https://images.unsplash.com/photo-1611072548855-926fb6456a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    date={new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    author={{
                      name: post.author,
                      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    }}
                    readTime="5 min"
                    delay={0.1 + index * 0.1}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No blog posts available at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
