import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { appRouter } from './routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/', appRouter);

app.listen(PORT, () => {
	console.log(`SERVER STARTED AT PORT ${PORT}`);
});
