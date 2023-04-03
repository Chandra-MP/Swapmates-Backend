import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// import postRoutes from './routes/posts.js' 
import authRoutes from './routes/auth.js'
// import userRoutes from './routes/users.js'


const port = 8800;
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())


//add routes for auth, users and posts
app.use("/api/auth/", authRoutes)
// app.use("/api/users", userRoutes)
// app.use("/api/posts", postRoutes)




app.listen(8800, ()=>{
console.log("The server is running at port", port)
})