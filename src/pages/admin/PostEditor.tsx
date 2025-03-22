import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Check, ChevronLeft, Save } from "lucide-react";
import { Post, createPost, getPostById, updatePost } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Form schema for validation
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters" }),
  author: z.string().min(1, { message: "Author is required" }),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(["published", "draft"]),
  is_featured: z.boolean().default(false),
});

// Sample author list
const authors = [
  { value: "Ahmed Hassan", label: "Ahmed Hassan" },
  { value: "Sophia White", label: "Sophia White" },
  { value: "Omar Farooq", label: "Omar Farooq" },
];

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const isEditMode = id !== "new" && id !== undefined;

  // Initialize form with zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      author: "",
      meta_title: "",
      meta_description: "",
      tags: "",
      status: "draft",
      is_featured: false,
    },
  });

  // Fetch post data if in edit mode
  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id!),
    enabled: isEditMode,
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to load post. Redirecting to posts list.",
        variant: "destructive",
      });
      navigate("/admin/posts");
    }
  });

  // Update form when post data is loaded
  useEffect(() => {
    if (isEditMode && post) {
      form.reset({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        author: post.author,
        meta_title: post.meta_title || "",
        meta_description: post.meta_description || "",
        tags: post.tags || "",
        status: post.status,
        is_featured: post.is_featured,
      });
    }
  }, [isEditMode, post, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    try {
      if (isEditMode && id) {
        // Update existing post
        await updatePost(id, values);
        toast({
          title: "Post updated",
          description: "Your blog post has been successfully updated",
        });
      } else {
        // Create new post
        await createPost(values);
        toast({
          title: "Post created",
          description: "Your blog post has been successfully created",
        });
      }
      
      // Invalidate posts query to refresh data
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      
      // Redirect to posts list
      navigate("/admin/posts");
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save the post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/admin/posts")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">
              {isEditMode ? "Edit Post" : "Create New Post"}
            </h1>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => form.setValue("status", "draft")}
              type="button"
            >
              Save as Draft
            </Button>
            <Button 
              onClick={() => {
                form.setValue("status", "published");
                form.handleSubmit(onSubmit)();
              }}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? "Publishing..." : "Publish"}
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {isPostLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter post title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief summary of the post" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            A short description that appears in blog listings (150-200 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an author" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {authors.map((author) => (
                                <SelectItem key={author.value} value={author.value}>
                                  {author.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="maintenance, summer, tips, dubai" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Comma-separated list of tags (e.g., "maintenance, summer, tips")
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="is_featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Featured Post
                            </FormLabel>
                            <FormDescription>
                              This post will be highlighted in featured sections
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write your post content here..." 
                              className="min-h-[300px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            In a real implementation, this would be a rich text editor
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="p-4 border rounded-md space-y-4">
                      <h3 className="font-medium">SEO Settings</h3>
                      
                      <FormField
                        control={form.control}
                        name="meta_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="SEO title (appears in search results)" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="meta_description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="SEO description (appears in search results)" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/admin/posts")}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PostEditor;
