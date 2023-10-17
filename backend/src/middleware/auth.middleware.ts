//Middleware to validate access token
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import * as AuthService from '../auth/auth.service';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction ) => {
    
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
        const user = await AuthService.getUserByID(payload.userId);
        if(!user) return res.status(401).send({
            message: "unauthorized user"
        });
        //return the payload id and pass to the next function
        res.locals.user = user.id;
        next();
    } catch (error: any) {
        return res.status(401).send({
            message: "unauthorized user"
        });
    }
}
