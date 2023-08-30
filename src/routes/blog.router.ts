import { Router, Request, Response } from "express";
import {authenticateUser} from '../middleware/auth.middleware';
//exporting the routes so as to be able to include it in index.ts
export default (router: Router) => {
  router
    .get("/blogs/", authenticateUser, (req: Request, res: Response) => {
        const userId = res.locals.user;
        return res.status(200).send({userId})
    })
    
};
