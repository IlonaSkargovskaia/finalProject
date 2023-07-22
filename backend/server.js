import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())



// POST API for adding a new event and check in postman
app.post('/api/events', async (req, res) => {
    const { date, image_url, location, description, places } = req.body;
  
    try {
      const newEvent = await db('events').insert({
        date,
        image_url,
        location,
        description,
        places,
      });
  
      //if all good - 201 respond
      res.status(201).json(newEvent);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  });



app.listen(process.env.PORT || 3001, () => {
    console.log(`listen on ${process.env.PORT || 3001}`);
})
