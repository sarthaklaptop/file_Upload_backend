const File = require("../models/fileModel");
const cloudinary = require("cloudinary")
const mongoose = require("mongoose")



//validation function

function isFileTypeSupport(fileType, fileTypeSupports)  {

    return fileTypeSupports.includes(fileType);
    
    
}

// coludinery file upload function

async function uploadFileToCloudinary(file, folder) {
    // Set Cloudinary upload options
    const options = { 
        folder: folder,
        resource_type: "auto" // Specify the resource type as "video"
    };

    // Use the Cloudinary uploader to upload the file
    // const result = await cloudinary.v2.uploader.upload(file.tempFilePaths[0], options);

    try {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
    }
}

// upload file to cloudenary

exports.cloudinaryFileUpload = async (req, res) =>{
    try{

        //fetch file 

        const {Name, Description} = req.body;

        console.log("Name: ", Name);
        console.log("Description: ", Description);

        const file = req.files.file;

        console.log("file =>", file);

        // validations

        const fileTypeSupports = ['jpg', "jpeg", 'png'];

        const fileType = file.name.split('.')[1];

        if(! isFileTypeSupport(fileType, fileTypeSupports)){
            return res.status(400).json({
                success: false,
                message: "file type is not supported",
            })
        }

        // upload to cloudinary
   
        const response = await uploadFileToCloudinary(file, "sarthak")
        console.log("response => ",response)

        const fileUpload = new File({
            Name,
            Description, 
            file: response.secure_url
        })


        const data = await fileUpload.save();
        console.log("uploadFile ->", fileUpload)

        res.status(200).json({
            success: true,
            response,
            message: "File uploaded successfully",
        });



    }catch(error){
        console.error(error)
        res.status(400).json({
            success: "false",
            message: "Unable to upload file",
        })
    }
}

// Fetch file

//   // Make sure to replace with the correct path

exports.fetchFile = async (req, res) => {
    
    try {
        const images = await File.find();
       

        res.status(200).json({
            success: true,
            message: "Images fetched successfully",
            data: images, // Include the fetched images in the response
        });
        
    } catch (error) {
        console.error(error); // Fix the typo here
        res.status(400).json({
            success: false,
            message: "Problem while fetching images",
        });
    }
};

// Increment view count endpoint
exports.incrementViewCount = async (req, res) => {
    try {
      const { imageId } = req.params;
      const image = await File.findById(imageId);
  
      if (!image) {
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }
  
      image.views += 1;
      await image.save();
  
      res.status(200).json({
        success: true,
        message: "View count incremented successfully",
        views: image.views,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
