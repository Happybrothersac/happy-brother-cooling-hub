
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface PostEditorContentProps {
  control: Control<any>;
}

const PostEditorContent: React.FC<PostEditorContentProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
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
          control={control}
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
          control={control}
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
  );
};

export default PostEditorContent;
