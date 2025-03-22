
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";

// Sample author list - in a real app, this might come from a database
const authors = [
  { value: "Ahmed Hassan", label: "Ahmed Hassan" },
  { value: "Sophia White", label: "Sophia White" },
  { value: "Omar Farooq", label: "Omar Farooq" },
];

interface PostEditorBasicInfoProps {
  control: Control<any>;
}

const PostEditorBasicInfo: React.FC<PostEditorBasicInfoProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
  );
};

export default PostEditorBasicInfo;
