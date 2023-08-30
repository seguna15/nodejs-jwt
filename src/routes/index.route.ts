import express from "express";
import auth from "./auth.router";
import blogRouter from "./blog.router";


const router = express.Router();

export default (): express.Router => {
    auth(router);
    blogRouter(router);
    return router;
};
