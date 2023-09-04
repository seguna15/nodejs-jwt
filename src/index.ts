import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import cors from 'cors'
import authRoute  from './auth/auth.router';
import blogRouter from './blog/blog.router';

dotenv.config()

if (!process.env.PORT || !process.env.API_URL) process.exit(1);

const PORT = parseInt(process.env.PORT as string, 10);
const API_URL = process.env.API_URL

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

app.use(`${API_URL}/auth`, authRoute());
app.use(`${API_URL}/blogs`, blogRouter());

//to generate random strings
//console.log(require('crypto').randomBytes(64).toString('base64'));

app.listen(PORT, () => console.log(`app listening on http://localhost:${PORT}`));


