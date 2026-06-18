import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import  {notFoundHandler}  from './middleware/notFoundHandler.js';
import  {errorHandler}  from './middleware/errorHandler.js';
import router from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errors } from "celebrate";
import cookieParser from "cookie-parser";

await connectMongoDB();

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);
app.use(authRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Сервер запущен on port ${PORT}!`);
});
