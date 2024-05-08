import dontenv from 'dotenv'
import { createServer } from 'http';
import express, { NextFunction, Response, Request } from 'express';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

//routers here
import entityRouter from './router/entity.router';
dontenv.config();
//server setup
const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);

const limit = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(cors());
app.use('/api',limit);
app.use(express.json());
app.use(cookieParser());

//routes here
app.use('/api/entity', entityRouter);

// will help to server the web
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) return next();
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path))
        return next();
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.join(__dirname, './web/dist', 'index.html'));
});
app.use(express.static(path.join(__dirname, './web/dist')));
app.use('/api/helloworld', (_, res: Response) => res.status(200).json('Hello World'));
httpServer.listen(PORT, () => console.log('Server is listening to port ', PORT));