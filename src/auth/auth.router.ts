import { Router } from "express";
import { createUser, login, logout, refresh } from "./auth.controller";

//exporting the routes so as to be able to include it in index.ts
export const routes =  (router: Router) => {
    router
        .post('/api/register', createUser)
        .post('/api/login', login)
        .post('/api/refresh', refresh)
        .post('/api/logout', logout);
}