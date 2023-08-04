// import upload from '../helpers/upload.helper.js';
// import util from 'util';

// export const uploadSingle = (req, res) => {
//     // req.file contains a file object
//     res.json(req.file);
// }

// export const uploadMultiple = (req, res) => {
//     // req.files contains an array of file object
//     res.json(req.files);
// }

// export const uploadSingleV2 = async (req, res) => {
//     const uploadFile = util.promisify(upload.single('file'));
//     try {
//         await uploadFile(req, res); 
//         res.json(req.file);
//     } catch (error) { 
//         res.status(500).json({ message: error.message });
//     } 
// }