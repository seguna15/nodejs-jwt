import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as AuthService from './auth.service';
import * as bcrypt from 'bcrypt';
import {sign, verify} from 'jsonwebtoken';


/**
 ** Remember to add a secure and samesite flag to your cookie in production
 ** res.cookie('refreshToken', { httpOnly: true, expiredAt: '1d', sameSite: 'none', secure: true})
 */

//create user username, email & password
export const createUser =  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    //if error return the errors
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    // create new user 
        //set request body as the user
        //pass request body to createUser function 
        //return the new user 
        //if any error catch the error and return a 500 response
    try {
        const user = req.body;
        const newUser = await AuthService.createUser(user);

        return res.status(201).json(newUser); 
    }catch(error: any){
        return res.status(500).json(error.message);
    }
}

//login controller accepts username and password, then return our access and refresh token
export const login = async( req: Request, res: Response) => {
    const cookies = req.cookies;
    
    const {email, password} = req.body;

    //get the user by email
    const user = await AuthService.getUserByEmail(email);

    //if the user does not exist return 400 invalid credentials
    if(!user) return res.status(400).send({message: 'Invalid credentials'});

    //validating user password
    const comparePassword = await bcrypt.compare(password, user.password);
    
    //if the password does not match the user's password return an error
    if(!comparePassword) return res.status(403).send({message: 'unauthorized access'});
    
    //if we have cookies coming alongside the login delete it and clear even if you cannot delete still clear
    if(cookies?.refreshToken)  {
        const deletedCookie = AuthService.deleteSession(cookies.refreshToken);
       
        //clear even if cookie was not deleted from database
        if (!deletedCookie) {
            res.clearCookie("refreshToken", {
              httpOnly: true,
              maxAge: 0,
            });
        
        }

        // clwar cookies even if it has been deleted from the db
        res.clearCookie("refreshToken", {
          httpOnly: true,
          maxAge: 0,
        }); 
    }

    const  refreshSecret: string = process.env.REFRESH_TOKEN_SECRET ?? '';
    
    //if refreshSecret is not available return error
    if(!refreshSecret) return res.status(403).send({message: 'unauthorized access'}); 
    
    //create refresh token
    const refreshToken  = sign(
        {
            id: user.id
        }, 
        refreshSecret,
        {expiresIn: '1d'}
    ); 


    //http only cookies
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }); // add secure and samesite flag for production

    //creating the expiration date for the session
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate()+ 7)

    try{
        //calling the AuthService to create our session for us.
        await AuthService.createSession({
            userId: user.id,
            token: refreshToken,
            expiredAt
        });

        const  accessSecret: string = process.env.ACCESS_TOKEN_SECRET ?? '';
        
        //if no accessToken return error
        if(!accessSecret)  return res.status(403).send({message: 'unauthorized access'}); 

        //creating access token
        const accessToken = sign(
            {userId: user.id},
            accessSecret,
            {expiresIn: '5m'}
        );
        
        res.status(200).json({accessToken});
    }catch(error: any){
        return res.status(500).send(error.message);
    } 

   
}

//refresh token controller method, when access token expires hit refresh to give you a new access token

export const refresh = async  (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        if(!refreshToken) return res.status(403).send({message: 'unauthorized access'});

        const  refreshSecret: string = process.env.REFRESH_TOKEN_SECRET ?? '';
    
        //if refreshSecret is not available return error
        if(!refreshSecret) return res.status(403).send({message: 'unauthorized access'});
        const payload: any = verify(refreshToken, refreshSecret);

        //if payload does not exist user is unauthorized
        if(!payload) return res.status(401).send({
            message: 'unauthenticated user'
        });

        //get token from db
        const dbToken = await AuthService.getToken(payload.id);

        //check if db token exist
        if(!dbToken) return res.status(401).send({massage: 'Unauthenticated user'});

        const  accessSecret: string = process.env.ACCESS_TOKEN_SECRET ?? '';
        
        //if no accessToken return error
        if(!accessSecret)  return res.status(403).send({message: 'unauthorized access'}); 

        //creating access token
        const accessToken = sign(
            {userId: payload.id},
            accessSecret,
            {expiresIn: '5m'}
        );
        
        res.status(200).json({accessToken});
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies['refreshToken'];

    if(!refreshToken){
        res.clearCookie('refreshToken', {
            httpOnly: true,
            maxAge: 0
        }); 
        return res.status(200).send({message: 'No token'});
    } 
     
    try {
        //find the session on the database
        const foundSession = await AuthService.deleteSession(refreshToken);
        if(!foundSession) res.clearCookie('refreshToken', {
            httpOnly: true,
            maxAge: 0
        }); 

        res.clearCookie("refreshToken", {
          httpOnly: true,
          maxAge: 0,
        }); 
        return res.status(204).send({message: 'Logged out'}); //204 no content 
    } catch (error: any) {
        return res.status(500).send(error.message)
    }

}