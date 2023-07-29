import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(routes); // my main router from index.js

app.listen(process.env.PORT || 3001, () => {
    console.log(`listen on ${process.env.PORT || 3001}`);
})
