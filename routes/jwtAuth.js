import express from "express";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import { validInfo } from "../middleware/validinfo.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

//registering
router.post("/register", validInfo, async (req, res) => {
    try {
        // 1. destructure req.body (name, email, password)

        const username = req.body.username;
        const email = req.body.email.toString().toLowerCase();
        const password = req.body.password.toString();

        // 2. check if user exist (if user exist then throw error)

        const user = await db("users").where("email", email); // []

        if (user.length !== 0) {
            return res
                .status(401)
                .json({ error: "User already exists" });
        }

        // 3. if not exist - Bcrypt password

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //4. add new user inside database

        const newUser = await db("users")
            .insert({ username, email, password: hashPassword, role: "user" })
            .returning("*");

        //res.json(newUser[0]);

        //5. generating jwt token

        const token = jwtGenerator(newUser[0].id);
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }
});

//login
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure req.body

        const { email, password } = req.body;

        //2. check if user exist (if not - throw error)

        const user = await db("users").where("email", email);
        if (user.length === 0) {
            return res
                .status(401)
                .json({ message: "Password or email is incorrect" });
        }

        //3. check if incoming password from user = the same as database password

        const validPassword = await bcrypt.compare(password, user[0].password);

        //console.log(validPassword);
        if (!validPassword) {
            res.status(401).json({ message: "Password is incorrect" });
        }

        //4. give them jwt token
        const token = jwtGenerator(user[0].id);
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }
});

export default router;
