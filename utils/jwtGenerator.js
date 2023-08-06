import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//id - name of column with primaty key in users
const jwtGenerator = (id) => {
    const payload = {
        user: id
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'})
}

export default jwtGenerator;