import { db } from "../utils/db.utils";
import * as bcrypt from 'bcrypt';

//user type definition
export type User = {
    id: number,
    username: string,
    email: string,
    password: string,
}

//session type definition
export type Session = {
    userId: number,
    token: string,
    expiredAt: Date
}

//this function returns the promise of type User,
    //we are omitting user id as it will be generated automatically.
    //we are also omitting password on the return type because we do not want to return the user's password
export const createUser = async (user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> => {
    const {username, email, password} = user;

    const hashPassword = await bcrypt.hash(password, 12);

    //create the user
    const result = db.user.create({
        data: {
            username,
            email,
            password: hashPassword,
        },
        select: {
            id: true,
            username: true, 
            email: true,           
        }
    })

    return result;
}

//get user by ID
export const getUserByID = async(id: number) =>  {
    //select user based on email
    const result = await db.user.findUnique({
        where: {
            id
        }
    });
    return result;
}

//get user by email 
export const getUserByEmail = async (email: string) => {
    //selecting user based on email
    const result = await db.user.findUnique({
        where: {
            email
        }
    })

    return result;
}

//service function save Session Data unto the database
export const createSession = async (session: Session) => {
    //Destructuring session data sent from our login function  
    const {userId, token, expiredAt} = session;
    
    await db.session.create({
        data: {
            userId,
            token,
            expiredAt
        }
    });
}

//get token from the data 
export const getToken = async (userId: number) => {
    const result = await db.session.findFirst({
        where: {
            userId,
            expiredAt: {
                gte: new Date()
            }
        }
    });

    return result;
}

//delete session
export const deleteSession = async(token: string ) =>  {
    //delete session from database
    return await db.session.delete({
        where: {
            token,
        }
    });
}