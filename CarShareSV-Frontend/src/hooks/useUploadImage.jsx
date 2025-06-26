import { useCallback, useState } from "react";
import { sendImageToCloud } from "../services/cloudinary.service"; 

export default function useUploadImage () {
  const [imagesLoading, setImagesLoading] = useState(false);
  
  const uploadImages = useCallback(async (files) => {
    setImagesLoading(true);
    let imageArray = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "");
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY || "");
      formData.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER_NAME || "");

      try {
        const uploadedImage = await sendImageToCloud(formData);
        imageArray.push(uploadedImage);
      } catch (err) {
        console.error(err);
      }
    }
    
    setImagesLoading(false);
    return imageArray;
  }, []);

  return {
    uploadImages,
    imagesLoading
  }
}