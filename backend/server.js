import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/eventRoutes.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/api/events', routes);

app.listen(process.env.PORT || 3001, () => {
    console.log(`listen on ${process.env.PORT || 3001}`);
})
