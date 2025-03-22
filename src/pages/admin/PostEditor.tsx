
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Post, createPost, getPostById, updatePost } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Import new components
import PostEditorHeader from "@/components/admin/PostEditorHeader";
import PostEditorBasicInfo from "@/components/admin/PostEditorBasicInfo";
import PostEditorContent from "@/components/admin/PostEditorContent";
import PostEditorActions from "@/components/admin/PostEditorActions";

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

type FormValues = z.infer<typeof formSchema>;

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const isEditMode = id !== "new" && id !== undefined;

  // Initialize form with zod resolver
  const form = useForm<FormValues>({
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
    onSettled: (data, error) => {
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load post. Redirecting to posts list.",
          variant: "destructive",
        });
        navigate("/admin/posts");
      }
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

  const onSubmit = async (values: FormValues) => {
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
        // Create new post - ensure all required fields are present
        const newPostData: Omit<Post, 'id' | 'created_at' | 'updated_at'> = {
          title: values.title,
          content: values.content,
          excerpt: values.excerpt,
          author: values.author,
          meta_title: values.meta_title,
          meta_description: values.meta_description,
          tags: values.tags,
          status: values.status,
          is_featured: values.is_featured
        };
        
        await createPost(newPostData);
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

  const handlePublish = () => {
    form.setValue("status", "published");
    form.handleSubmit(onSubmit)();
  };

  const handleDraftSave = () => {
    form.setValue("status", "draft");
    form.handleSubmit(onSubmit)();
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <PostEditorHeader 
          isEditMode={isEditMode} 
          loading={loading} 
          onPublish={handlePublish}
          onDraftSave={handleDraftSave}
        />
        
        {isPostLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PostEditorBasicInfo control={form.control} />
                  <PostEditorContent control={form.control} />
                </div>
                
                <PostEditorActions loading={loading} />
              </form>
            </Form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PostEditor;
