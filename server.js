import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';

// ------------ for AWS
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import AWS from 'aws-sdk';

// import { S3Client } from '@aws-sdk/client-s3'; 

// -------------

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);


// ------------ old
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// const s3 = new AWS.S3();

// ------------------ new
// const s3 = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//   }); 

// const myBucket = process.env.AWS_BUCKET;

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: myBucket,
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
// });

// app.post('/upload', upload.single('pic'), (req, res) => {
//   console.log(req.file);
//   res.json('Successfully uploaded');
// });

// --------------- end AWS


app.listen(process.env.PORT || 3002, () => {
  console.log(`listen on ${process.env.PORT || 3002}`);
});


//------DEPLOY

// // Have Node serve the files for our built React app
// // app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(express.static(path.join(__dirname, "client/build")));

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
