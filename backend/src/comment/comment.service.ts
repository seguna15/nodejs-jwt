import { db } from "../utils/db.utils";


//service method to create comment
export const createComment = async (commentBody: string, userId: number, blogId: number) => {
    try {
        const comment = db.comment.create({
            data: {
                body: commentBody,
                userId: userId,
                blogId: blogId,
            }
        });

        return comment;
    } catch (error: any) {
        return error.message;
    }
}

//service to get all comments on a post
export const fetchAllComments = async (blogId: number) => {
    try {
        const comments = await db.comment.findMany({
          where: {
            blogId,
          },
          include: {
            user:{
                select: {
                    username: true
                }
            } 
          }
        });


       
        return comments;
    } catch (error: any) {
        return error.message;
    }
}

//delete comment
export const deleteComment = async (id: number) => {
    try{
        const result = await db.comment.delete({
            where: {
                id,
            }
        });
        return result;
    }catch(error: any){
        return error.message
    }
}