import express from "express";
import {
  createUser,
  login,
  logout,
  refresh,
} from "./auth.controller";

const router = express.Router();

//exporting the routes so as to be able to include it in index.ts
export default (): express.Router => {
  router
    .post("/register", createUser)
    .post("/login", login)
    .post("/refresh", refresh)
    .post("/logout", logout);
    return router;
};

/* export default (): express.Router => {
  auth(router);
  blogRouter(router);
  return router;
};
 */