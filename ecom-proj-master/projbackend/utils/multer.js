const multer = require("multer");
const path = require ("path");

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req , file , cb) => {
        ext = path.extname(file.originalname);
        if (ext !==".jpg" && ext !==".jpeg" && ext !==".png"){
            cb(new Error("file type is not supported") , false)
            return ;
        }
        cb(null,true)
    }
})