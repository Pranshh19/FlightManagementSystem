var multer =require('multer');

var Serverpath=multer.diskStorage({
    destination: (req,file,path)=>{
        path(null,"public/images");
    },
    filename: (req,file,path)=>{
        path(null,file.originalname);
    },
});
var upload = multer({storage:Serverpath});
module.exports=upload; 