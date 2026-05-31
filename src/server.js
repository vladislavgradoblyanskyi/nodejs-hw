import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import  {notFoundHandler}  from './middleware/notFoundHandler.js';
import  {errorHandler}  from './middleware/errorHandler.js';
import router from './routes/notesRoutes.js';
await connectMongoDB();

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`Сервер запущен on port ${PORT}!`);
});
