
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import AdminLayout from "@/components/admin/AdminLayout";
import { Edit, FileText, PlusCircle, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Post, deletePost, getPosts } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PostsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  // Fetch posts using react-query
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  // Handle post deletion
  const handleDeletePost = async () => {
    if (postToDelete) {
      try {
        await deletePost(postToDelete);
        
        // Invalidate the posts query to refresh the data
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        
        // Show success toast
        toast({
          title: "Post deleted",
          description: "The blog post has been successfully deleted",
        });
        
        // Reset postToDelete
        setPostToDelete(null);
      } catch (error) {
        console.error('Error deleting post:', error);
        toast({
          title: "Error",
          description: "Failed to delete the post. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load posts. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Button onClick={() => navigate("/admin/posts/new")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm">
            {posts && posts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={post.status === "published" ? "default" : "secondary"}
                        >
                          {post.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => navigate(`/blog/${post.id}`)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setPostToDelete(post.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the blog post
                                  and remove it from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setPostToDelete(null)}>
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={handleDeletePost} 
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No posts found. Create your first post!</p>
                <Button onClick={() => navigate("/admin/posts/new")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PostsList;
