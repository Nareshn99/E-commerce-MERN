import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import catagoryRouter from './routes/catagoryRoutes.js';


const app = express();

//config env
dotenv.config()

//connect Db
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/catagory',catagoryRouter)




let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Express app running on port>>>>>>>  ${PORT}`)
});