import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(routes); 

app.listen(process.env.PORT || 3002, () => {
    console.log(`listen on ${process.env.PORT || 3002}`);
})

// // Have Node serve the files for our built React app
// // app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(express.static(path.join(__dirname, "client/build")));

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
