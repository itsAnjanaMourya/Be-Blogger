import express from "express"
import { addPost, getPost, getMyPosts, getPosts, deletePost, updatePost} from "../controllers/post.js"


const router = express.Router()

router.get("/",getPosts)
router.post("/myBlog",getMyPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)


export default router