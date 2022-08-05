import CONFIG from './config.mjs';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import allRoutes from './router.mjs';

const app = express();

app.use(cors({ origin: CONFIG.APP.CORS }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(allRoutes);

app.listen(CONFIG.APP.PORT, () => console.log(`Listening on port ${CONFIG.APP.PORT}`));

