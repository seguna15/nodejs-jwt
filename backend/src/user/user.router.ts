import  express from "express";
import { getUser } from "./user.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();

export default (): express.Router => {
    router.get('/get-user',[authenticateUser], getUser)

    return router;
}