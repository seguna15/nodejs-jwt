import { Request, Response } from "express";
import * as UserService from './user.service';

export const getUser = async (req: Request, res: Response) => {
    const userId = res.locals.user;
    
     try {
        const user = await UserService.fetchUser(userId);
        return res.status(200).send(user);
    } catch (error: any) {
        return res.status(500).send(error.message);
    } 
}