// import multerS3 from 'multer-s3';
// import multer from 'multer'; 
// import path from 'path'; 

// import s3 from '../utils/s3.util.js'; 

// const upload = multer({
//     storage: multerS3({
//         s3,
//         acl: 'public-read',
//         bucket: process.env.AWS_BUCKET,
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: (req, file, cb) => {   
//             const fileName = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
//             cb(null, `${fileName}${path.extname(file.originalname)}`);
//         }
//     })
// });

// export default upload;