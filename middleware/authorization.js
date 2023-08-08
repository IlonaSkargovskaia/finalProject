import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config(); 


export const authorization = async(req, res, next) => {
    try {

        //1. get token from fetch request and destructure it
        const jwtToken = req.headers['authorization'];
        //console.log('jwtToken:', req.headers);
        //2. check if token exist
        if (!jwtToken) {
            return res.status(403).json('Token not exist');
        }

        //3. check if this token valid
        const payload = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET)
        req.user = payload.user; //from jwtGenerator object user: id

        //console.log('User id:', req.user); //get id

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(403).json('Not Authorize');
    }
}
