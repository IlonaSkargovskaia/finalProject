import express from 'express';
import db from '../config/db.js';
import {authorization} from '../middleware/authorization.js'

const router = express.Router();

//check in postman GET - localhost:3005/dashboard
//in headers put key:token and value: token of user  and if all good - I get in postman user id
router.get('/', authorization, async(req, res) => {
    try {
        // after authorization user has a payload
        //for checking
        //res.json(req.user); 

        //get data from user: select * from users where in column id there is req.user
        //and if all good - we get all info in {} about user
        const user = await db('users').where('id', req.user);
        console.log('User from dashboard: ', user);
        res.json(user[0]);

    } catch (error) {
        console.log(error);
        res.status(500).json('Server error')
    }
})

export default router;