import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

export const saveToCloudinary = async (path, folder) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder,
      use_filename: true,
      unique_filename: false,
    });

    fs.unlinkSync(path);

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    throw error;
  }
};
