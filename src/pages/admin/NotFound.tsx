
import { Button } from "@/components/ui/button";
import { ArrowLeft, Slash } from "lucide-react";
import { Link } from "react-router-dom";

const AdminNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-blue-50/50 p-4">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-4">
            <Slash className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The admin page you're looking for doesn't exist or you don't have permission to access it.
        </p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/admin/dashboard">
            <Button variant="default" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNotFound;
