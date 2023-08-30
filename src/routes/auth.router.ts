import { Router } from "express";
import { createUser, login, logout, refresh } from "../controller/auth.controller";

//exporting the routes so as to be able to include it in index.ts
export default  (router: Router) => {
    router
        .post('/auth/register', createUser)
        .post('/auth/login', login)
        .post('/auth/refresh', refresh)
        .post('/auth/logout', logout);
}