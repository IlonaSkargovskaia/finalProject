import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {db} from './config/db.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())


// Test API route
app.get('/', (req, res) => {
    res.send('Event Management System API is running!');
});


app.listen(process.env.PORT || 3001, () => {
    console.log(`listen on ${process.env.PORT || 3001}`);
})


// //check connection to db
// import {db} from './config/db.js';

//in eleph
// create table products (
// 	id serial primary key,
// 	name varchar(255) not null,
// 	price integer not null
// )

// insert into products (name,price)
// values('iPhone', 800),
// ('iPad', 700),
// ('iWatch', 600)

// db('products')
// .select('*')
// .then(rows => {
//     console.log(rows);
// })