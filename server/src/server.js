import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { appRouter } from "./routes/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use("/", appRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`SERVER STARTED AT PORT ${PORT}`);
});
