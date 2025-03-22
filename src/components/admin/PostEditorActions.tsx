
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PostEditorActionsProps {
  loading: boolean;
}

const PostEditorActions: React.FC<PostEditorActionsProps> = ({ loading }) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default PostEditorActions;
