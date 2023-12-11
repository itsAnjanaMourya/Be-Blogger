import { db } from "../db.js";
import jwt from "jsonwebtoken";
export const addProfile =(req,res)=>{
    //if imgUrl exist in req then call a db query to save update imgUrl
       console.log("///////////.....",JSON.stringify(req.body));
       console.log("///////////.....",req.file);

       jwt.verify(req.body.access_token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

       const q = "update blog.users set img=? where id=?"

       const values=[
        req.body.userImg,
        userInfo.id
       ]
       db.query(q,values,(err,data)=>{
        if(err) return res.status(500).json(err)
    
        return res.status(200).json("profile added")

   })
})
}