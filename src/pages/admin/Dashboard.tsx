
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import { FileText, PenSquare, Users, Eye, ArrowRightCircle } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    if (authStatus !== "true") {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Stats for dashboard (mock data)
  const dashboardStats = [
    {
      title: "Total Blog Posts",
      value: "12",
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: "/admin/posts"
    },
    {
      title: "Draft Posts",
      value: "3",
      icon: <PenSquare className="h-6 w-6 text-amber-500" />,
      link: "/admin/posts"
    },
    {
      title: "Total Views",
      value: "2,354",
      icon: <Eye className="h-6 w-6 text-green-500" />,
      link: "/admin/analytics"
    },
    {
      title: "Admin Users",
      value: "1",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      link: "/admin/users"
    }
  ];

  if (!isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  {stat.icon}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate(stat.link)}
                    className="h-8 w-8"
                  >
                    <ArrowRightCircle className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions on the site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium">New blog post published</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">Updated "Services" page content</p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
                <div>
                  <p className="font-medium">Added new user</p>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/admin/posts/new")}
              >
                <PenSquare className="mr-2 h-4 w-4" />
                Create New Blog Post
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/admin/posts")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Manage Existing Posts
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/")}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Website
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
