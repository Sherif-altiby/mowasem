import { Blogs } from "@/types/Data/blogs";
import { getData } from "../apiBase";
import { BlogDetails } from "@/types/Data/blogDetails";

export const getBlogs = async () => {
  try {
    return await getData<Blogs>(`/blogs?limit=6`);
  } catch (error) {
    console.warn("getBlogs timeout or error:", error);
    return null;
  }
};

export const getBlogBySlug = (slug: string) =>
  getData<BlogDetails>(`/blogs/slug/${slug}`);
