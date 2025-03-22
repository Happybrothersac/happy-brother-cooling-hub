
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

// Mock blog post data - in a real app, this would come from the backend
const mockPosts = [
  {
    id: "1",
    title: "Top 7 AC Maintenance Tips for Dubai Summer",
    status: "published",
    author: "Ahmed Hassan",
    date: "2023-06-15",
    views: 245
  },
  {
    id: "2",
    title: "Energy-Efficient Cooling: The Future of AC Technology",
    status: "published",
    author: "Sophia White",
    date: "2023-05-22",
    views: 187
  },
  {
    id: "3",
    title: "Why Regular AC Servicing Is Essential for Luxury Properties",
    status: "published",
    author: "Omar Farooq",
    date: "2023-04-10",
    views: 124
  },
  {
    id: "4",
    title: "Understanding AC SEER Ratings for Dubai's Climate",
    status: "draft",
    author: "Ahmed Hassan",
    date: "2023-07-04",
    views: 0
  },
  {
    id: "5",
    title: "The Impact of Proper AC Installation on Energy Bills",
    status: "draft",
    author: "Sophia White",
    date: "2023-07-01",
    views: 0
  }
];

const PostsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState(mockPosts);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  // Check if user is authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Handle post deletion
  const handleDeletePost = () => {
    if (postToDelete) {
      // Filter out the deleted post
      const updatedPosts = posts.filter(post => post.id !== postToDelete);
      setPosts(updatedPosts);
      
      // Show success toast
      toast({
        title: "Post deleted",
        description: "The blog post has been successfully deleted",
      });
      
      // Reset postToDelete
      setPostToDelete(null);
    }
  };

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
        
        <div className="bg-white rounded-md shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
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
                  <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                  <TableCell>{post.views}</TableCell>
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default PostsList;
