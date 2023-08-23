//Middleware to validate access token
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import * as AuthService from '../auth/auth.service';

const authenticateUser = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        //get the access from authorization header
        const accessToken = req.header('Authorization')?.split(" ")[1] || "";
        
        //verify the token 
        if(!process.env.ACCESS_TOKEN_SECRET) return res.status(401).send({
            message: "unauthenticated user"
        });

        const payload: any = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        if(!payload) return res.status(401).send({
            message: "unauthenticated user"
        });

        //get the user by payload id, because our payload contains the user Id,
        const user = await AuthService.getUserByID(payload.id);
        if(!user) return res.send(401).send({
            message: "unauthorized user"
        });
        //return the payload id and pass to the next function
        res.locals.user = user;
        next();
    } catch (error: any) {
        return res.send(401).send({
            message: "unauthorized user"
        });
    }
}

module.exports = authenticateUser;