import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import routes from "./routes/index.js";
import jwtAuth from "./routes/jwtAuth.js";
import dashboard from "./routes/dashboard.js";
import { s3Uploadv2 } from "./s3Service.js";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ilona.skars@gmail.com',
        pass: 'ouegihnzkwvvgqnt',
    },
});

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);



//---- UPLOAD TO AWS
const storage = multer.memoryStorage();

//ограничиваем типы файлов
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};
//test in postman: in formdata http://localhost:3005/upload
// limits: 1000000 - 1mB and files: 1 - only 1 file can upload
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 3000000, files: 1 },
});

app.post("/upload", upload.array("file"), async (req, res) => {
    const file = req.files[0];

    const result = await s3Uploadv2(file);

    console.log("URL:", result.url);
    console.log("Original Name:", result.originalName);
    console.log("ETag:", result.eTag);
    console.log("Server-side Encryption:", result.serverSideEncryption);

    res.json({ status: "Success uploading", result });
});

//different errors for user response
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "File is too large",
            });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message: "File limit reached",
            });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message: "File must be an image",
            });
        }
    }
});

//login-register-authorization
app.use("/auth", jwtAuth);

//dashboard router
app.use("/dashboard", dashboard);



//email

app.post('/send-email', async (req, res) => {
    const { recipientEmail, eventData } = req.body;
  
    const mailOptions = {
      from: 'ilona.skars@gmail.com',
      to: recipientEmail,
      subject: 'Ticket Purchase Confirmation',
      html: `
        <p>Thank you for purchasing tickets for the event.</p>
        <p>Event: ${eventData.title}</p>
        <p>Row: ${eventData.row}</p>
        <p>Seat: ${eventData.seat}</p>
        <p>Total Amount: ${eventData.total} ILS</p>
        
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
});

app.listen(process.env.PORT || 3002, () => {
    console.log(`listen on ${process.env.PORT || 3002}`);
});

//------DEPLOY

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(express.static(path.join(__dirname, "client/build")));

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
