import express from 'express';
import cors from 'cors';
import {v4 as uuidv4    } from 'uuid';
import multer from 'multer';
import path from 'path'

const app=express();


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+uuidv4()+ path.extname(
            file.originalname 
        ));
    }
});
//multer configuration

const upload=multer({storage:storage})

app.use(cors({
    origin:["http://localhost:3000","http://localhost:51173"],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With ,Content-Type,Accept"
    );
    next();
})
app.get('/',(req,res)=>{
    res.json({message:"hello"});

})
app.post('/uplaod',upload.single('file'),(req,res)=>{
    console.log("fileuplaoded");
})
app.listen(8000,()=>{
    console.log("server running in port 8000");
})
