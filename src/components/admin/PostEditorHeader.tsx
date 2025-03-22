
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PostEditorHeaderProps {
  isEditMode: boolean;
  loading: boolean;
  onPublish: () => void;
  onDraftSave: () => void;
}

const PostEditorHeader: React.FC<PostEditorHeaderProps> = ({ 
  isEditMode, 
  loading, 
  onPublish, 
  onDraftSave 
}) => {
  const navigate = useNavigate();

  return (
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
          onClick={onDraftSave}
          type="button"
        >
          Save as Draft
        </Button>
        <Button 
          onClick={onPublish}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? "Publishing..." : "Publish"}
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PostEditorHeader;
