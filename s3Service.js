import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export const s3Uploadv2 = async (file) => {
    const s3 = new S3Client();

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuidv4()}-${file.originalname}`,
        Body: file.buffer
    };
    try {
        const command = new PutObjectCommand(params);
        const response = await s3.send(command);

        // Construct the URL for the uploaded object
        const url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

        // Return an object with relevant information
        return {
            status: "Success uploading",
            url,
            originalName: file.originalname,
            eTag: response.ETag,
            serverSideEncryption: response.ServerSideEncryption
        };
    } catch (error) {
        // Handle errors if the upload fails
        console.error("Upload error:", error);
        throw error;
    }
}