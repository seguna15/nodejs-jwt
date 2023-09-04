import { db } from "../utils/db.utils";
import { Blog } from "./types/blog.type";

//getting all blogposts 
export const getBlogs = async () => {
    try {
        const result = await db.blog.findMany();
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