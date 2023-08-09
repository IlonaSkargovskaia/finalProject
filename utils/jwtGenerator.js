import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//id - name of column with primary key in users
const jwtGenerator = ({id, email, role}) => {
    const payload = {
        user: id,
        email,
        role
    }

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'})
}

export default jwtGenerator;