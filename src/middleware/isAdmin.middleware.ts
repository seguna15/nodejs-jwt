import { Request, Response, NextFunction } from "express";
import { db } from "../utils/db.utils";


//this middleware checks if the account is an admin account 
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.user;
    if(!id) return res.status(401).json({message: 'Unauthenticated user'});

    try {
      //get user role by Id
      const userRole = await db.user.findUnique({
        where: {
          id,
        },
        select: {
          role: true,
        },
      });

      //if user role is not ADMIN
      if (userRole?.role !== "ADMIN")
        return res.status(403).json({ message: "Forbidden! Unauthorized user." });

      //passing the id because we will need it as the author Id.
      res.locals.id = id;
      next();
    } catch (error: any) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}