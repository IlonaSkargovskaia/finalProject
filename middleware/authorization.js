import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config(); //access to env variables
//we use it to authorized person
export const authorization = async(req, res, next) => {
    try {

        //1. get token from fetch request and destructure it
        const jwtToken = req.header('token');

        //2. check if token exist
        if (!jwtToken) {
            return res.status(403).json('Not Authorize');
        }

        //3. check if this token valid
        const payload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = payload.user; //from jwtGenerator object user: id

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(403).json('Not Authorize');
    }
}
