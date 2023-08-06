import express from 'express';
import eventRoutes from './eventRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import ticketRoutes from './ticketRoutes.js';
import userRoutes from './userRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import locationRoutes from './locationRoutes.js';


// import upload from '../helpers/upload.helper.js';
// import {uploadSingle, uploadMultiple, uploadSingleV2} from '../controllers/upload.controller.js';

const router = express.Router();


// router.post('/upload-single', upload.single('file'), (req, res) => {
//     console.log(req.file); // Log the file data to check if it's being received correctly
//     uploadSingle(req, res); // Call your controller function
// });

// router.post('/upload-single',   upload.single('file'),    uploadSingle);
// router.post('/upload-multiple', upload.array('files', 5), uploadMultiple);
// router.post('/upload-single-v2',                          uploadSingleV2);

router.use('/', eventRoutes);
router.use('/', reviewRoutes);
router.use('/', ticketRoutes);
router.use('/', userRoutes);
router.use('/', categoryRoutes);
router.use('/', locationRoutes);


export default router;