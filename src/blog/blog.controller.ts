import { Request, Response } from "express";
import * as BlogService from "./blog.service";
import { Blog } from "./types/blog.type";

//get all the blog posts
export const getAllBlogs = async(req: Request, res: Response) => {
  const author = req.query.author;
  const authorId: number = typeof author === "string" ? parseInt(author, 10) : 0;

  const blogs = author
    ? await BlogService.getBlogs(authorId)
    : await BlogService.getBlogs();

  if (!blogs) return res.status(404).json({ message: "Blog not found" });
  return res.status(200).send(blogs);
};

//Get blog post by ID
export const getBlogById  = async (req: Request, res: Response) => {
  //get the id from the req.params object
  const {id} = req.params;

  //if no id return error
  if(!id) return res.status(400).json({message: "Something went wrong"});

  const blog = await BlogService.getById(parseInt(id));
  if(!blog) return res.status(404).json({message: "Blog not found"});

  return res.status(200).send(blog);
}

//this is a controller method to create blog post
export const createBlog = async(req: Request, res: Response ) => {
  //res.locals.id is coming from the isAdmin middleware
  const authorId = res.locals.id;
  if(!authorId) return res.status(403).json({message: "User is forbidden"});

  const {title, body, } = req.body;

  if(!title || !body) return res.status(400).json({message: "Check to see if all forms fields are filled"});

  const blog = {
    title,
    body,
    authorId
  }

  const result = await BlogService.createBlog(blog);

  if(!result) return  res.status(400).json({message: "Blog post could not be created"});

  return res.status(201).send(result);
}


//Edit Blog Posts
export const updateBlog = async (req: Request, res: Response) => {
  //Id will be gotten from the url
  const id = parseInt(req.params.id);
  if(!id) return res.status(400).json({message: "blog post id not found"});

  //authorId's value will be supplied by the isAdmin middleware.
  const authorId = res.locals.id;
  if(!authorId) return res.status(403).json({message: "User is forbidden"});

  const {title, body, } = req.body;
  if(!title || !body) return res.status(400).json({message: "Blog post should have body and title"});
  
  //creating a blog object to pass to the service
  const blog: Blog = {
    id,
    title,
    body,
    authorId,
  }
  const updatedBlog = await BlogService.editBlog(blog);

  if(!updatedBlog) return res.status(400).json({message: "Blog post could not be updated"}); 

  return res.status(201).send(updatedBlog);
}

//Controller method to delete blog post
export const deleteBlog = async (req: Request, res: Response) => {
  //Id will be gotten from the url
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "blog post id not found" });

  //authorId's value will be supplied by the isAdmin middleware.
  const authorId = res.locals.id;
  if (!authorId) return res.status(403).json({ message: "User is forbidden" });

  //call on the service method to delete the blog post
  const deletedBlog = await BlogService.deleteBlog(id, authorId);
  
  if(!deletedBlog) return res.status(404).json({message: "Blog post not found"});

  return res.status(200).send(deletedBlog);
}