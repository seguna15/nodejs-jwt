import { db } from "../utils/db.utils";
import { Blog } from "./types/blog.type";

//getting all blog posts 
export const getBlogs = async (authorId?: number) => {
    try {
        const result = authorId
          ? await db.blog.findMany({
              where: {
                authorId,
              },
            })
          : await db.blog.findMany();
        return result
    } catch (error: any) {
        return error.message
    }
}

//get by ID 
export const getById = async (id: number) => {
    try {
        const result = await db.blog.findUnique({
            where: {
                id
            }
        })
        return result;
    } catch (error) {
        return error;
    }
}

//service method to create Blog Post
export const createBlog = async (blog: Omit<Blog, "id">) => {
    //destructuring blog object
    const {title, body, authorId} = blog;
    try {
        const result = await db.blog.create({
            data: {
                title,
                body,
                authorId
            },
        })
        return result;
    } catch (error) {
        return error;
    }
}

//service method to edit Blog post 
export const editBlog = async (blog: Blog) => {
    //destructuring blog object;
    const { id, title, body, authorId } = blog;
    
    try {
        const result = await db.blog.update({
            data: {
                title,
                body,
            },
            where: {
                id,
                authorId
            }
        });
        return result;
    } catch (error) {
        return error;
    }
}

//service method to delete Blog post
export const deleteBlog = async (id: number, authorId: number) => {
    try {
        const result = await db.blog.delete({
            where: {
                id,
                authorId
            }
        });
        return result;
    } catch (error) {
        return error;
    }
}