import dotenv from "dotenv"; 
dotenv.config();
import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import multer from "multer"
import { db } from "./db.js";
import jwt from "jsonwebtoken";

const app = express()

const port = process.env.PORT || 8900
const baseUrl = process.env.BASE_URL;

app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser())
app.use(cors({ credentials: true, origin: baseUrl}))
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null,"../client/public/upload" )
    },
    filename: function (req, file, cb){
        cb(null, Date.now()+file.originalname)
    }

})

const upload = multer({ storage })


app.post("/api/upload", upload.single("file"), function(req,res){
    const file = req.file
    res.status(200).json(file.filename)
})

app.post("/api/profileUpload", upload.single("file"), function(req,res){
    const file = req.file
    jwt.verify(req.body.access_token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

       const q = "update blog.users set img=? where id=?"

       const values=[
        file.filename,
        userInfo.id
       ]
       db.query(q,values,(err,data)=>{
        if(err) return res.status(500).json(err)
        
        return res.status(200).json({filename:file.filename,msg:"profile added"})

        })
    })
})

app.listen(port,()=>{
    console.log("Connected!")
})