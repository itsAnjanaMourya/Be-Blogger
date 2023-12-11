import express from "express"
import { addProfile } from "../controllers/user.js"
const router = express.Router()


router.post("/", addProfile)
export default router