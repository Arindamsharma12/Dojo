import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use(express.json({
  limit:"16kb"
}))

app.use(express.urlencoded({
  extended:true,
  limit:"16kb"
}))
app.use(express.static('public'))
app.use(cookieParser()) 

//Routes Imports
import userRouter from './routes/user.routes.js'
import runCodeRoute from './routes/runCode.route.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api",runCodeRoute);

// http://localhost:8000/api/v1/users/register
export { app }