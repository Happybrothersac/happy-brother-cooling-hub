
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

// Auth helper functions
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data.user;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Types for our database models
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string;
  status: 'published' | 'draft';
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
}

// Blog post functions
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
  
  return data as Post[];
};

export const getPostById = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
  
  return data as Post;
};

export const createPost = async (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }
  
  return data as Post;
};

export const updatePost = async (id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw error;
  }
  
  return data as Post;
};

export const deletePost = async (id: string) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw error;
  }
  
  return true;
};

export const getPublishedPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching published posts:', error);
    throw error;
  }
  
  return data as Post[];
};

export const getFeaturedPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3);
    
  if (error) {
    console.error('Error fetching featured posts:', error);
    throw error;
  }
  
  return data as Post[];
};
