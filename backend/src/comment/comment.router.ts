import express from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { createComment, getComments, removeComment } from "./comment.controller";
import { isAdmin } from "../middleware/isAdmin.middleware";



const router = express.Router();

export default (): express.Router => {
    router
        .get('/blog/:blogId', getComments)
        .post('/blog/:blogId', authenticateUser, createComment)
        .delete('/:id', [authenticateUser, isAdmin], removeComment)

    return router;
}