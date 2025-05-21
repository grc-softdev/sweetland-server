import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

const app = express();

const allowedOrigins = [
  "https://sweetland.vercel.app",
  "https://sweetland-grcn-projects.vercel.app",
  "http://localhost:3000",
  "http://localhost:8081",
];

app.use((req, res, next) => {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: path.resolve(__dirname, '..', 'tmp')
}));

app.use(router);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
});

app.listen(process.env.PORT || 3333, () => console.log('online!'));