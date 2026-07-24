import multer from "multer";


const storage = multer.memoryStorage();


const upload = multer({
    storage,
    limits:{
        fileSize: 2 * 1024 * 1024
    },
    fileFilter:(req,file,cb)=>{

        if(
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ){
            cb(null,true);
        }
        else{
            cb(new Error("Only images are allowed"));
        }

    }
});


export default upload;