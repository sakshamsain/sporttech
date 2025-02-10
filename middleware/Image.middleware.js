import UploadOnSupabase from "../utils/supabase.js";

const uploadImage = async (req, res, next, bucketName) => {

    const imgfilePath = req?.file?.path;

    if (!imgfilePath) {
        console.log('Image not found');
        return res.status(400).json({ message: 'Image not found' });
    }



    try {
        const imglink = await UploadOnSupabase(imgfilePath, bucketName,req.uid);

        if (!imglink) {
            console.log('Error occurred while uploading image');
            res.status(500).json({ message: 'Error occurred while uploading image' });
        } else {
            req.imglink = imglink; // Set the image link if upload succeeds
        }
    } catch (error) {
        console.error('Error during image upload:', error);
        req.imglink = null; // Set imglink to null in case of an error
    }

    next(); // Call next middleware or route handler
};



const uploadImageMiddleware = (bucketName) => {
    return (req, res, next) => {
      uploadImage(req, res, next, bucketName);
    };
  };


export  {uploadImage,uploadImageMiddleware}