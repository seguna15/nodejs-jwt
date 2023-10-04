import express from "express";
import {authenticateUser} from '../middleware/auth.middleware';
import { isAdmin } from "../middleware/isAdmin.middleware";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "./blog.controller";


const router = express.Router();
//exporting the routes so as to be able to include it in index.ts
export default (): express.Router => {
  router
    .get("/", getAllBlogs)
    .get("/:id", getBlogById)
    .post("/", [authenticateUser, isAdmin], createBlog)
    .put("/:id", [authenticateUser, isAdmin], updateBlog )
    .delete("/:id", [authenticateUser, isAdmin], deleteBlog)
  return router;
};
