import { Request, Response } from "express";
import { getById } from "../blog/blog.service";
import * as CommentService from "./comment.service";


//get all comments
export const getComments = async (req: Request, res: Response) => {
    const blogId = parseInt(req.params.blogId);
    if(!blogId) return res.status(400).send("Invalid request");

    //check if blog post exist 
    const foundBlog = await getById(blogId);
    if(!foundBlog) return res.status(404).send("Blog post not found");

    const comments = await CommentService.fetchAllComments(blogId);
    if(!comments) return res.status(404).send("No comments found");

    return res.status(200).send(comments);
}

//create comment
export const createComment = async (req: Request, res: Response) => {
    const { commentBody } = req.body;
    if (!commentBody) return res.status(400).send("Invalid request");

    const blogId  = parseInt(req.params.blogId);
    if (!blogId) return res.status(400).send("Invalid request");

    //authorId's value will be supplied by the isAdmin middleware.
    const userId = res.locals.user;
    if (!userId) return res.status(403).json({ message: "User is forbidden" });

    //findBlog with the blogId
    const foundBlog = await getById(blogId);
    if(!foundBlog) return res.status(404).send('Blog post was not found');

    const comment = await CommentService.createComment(commentBody,userId,blogId)

    if(!comment) return res.status(500).send("Comment could not be added");

    return res.status(200).send(comment);
}   

//delete comment

export const removeComment = async (req: Request, res:Response) => {
  const authorId = res.locals.id;
  if (!authorId) return res.status(403).json({ message: "User is forbidden" });

  const id = parseInt(req.params.id);
  if (!id) return res.status(400).send("Invalid request");

  //call on the service method to delete the blog post
  const deletedComment = await CommentService.deleteComment(id);

  if (!deletedComment)
    return res.status(404).json({ message: "Blog post not found" });

  return res.status(200).send(deletedComment);
}