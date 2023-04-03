import express from 'express'
// import { addPost } from '../controllers/post_cont.js'
import { login, logout, register } from '../controllers/auth_cont.js'

const router = express.Router()

//Add routes for post methods from client
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router