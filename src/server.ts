import express, { Request, Response, NextFunction } from 'express'
import { router } from './routes';
import 'express-async-errors'
import cors from 'cors';
import path from 'path'
import fileUpload from 'express-fileupload';

const app = express();

const corsOptions = {
    origin: [
      "https://sweetland.vercel.app",
      "https://sweetland-grcn-projects.vercel.app",
      "http://localhost:3000",
      "http://localhost:8081",
    ],
    credentials: true,
  };

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

app.use(express.json());


app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use(router);

//access image url ex: localhost:3333/files.image-name.png
 app.use('/files',  express.static(path.resolve(__dirname, '..', 'tmp')))
// @ts-expect-error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error', 
        message: 'Internal server error.'
    })
})

app.listen(process.env.PORT, () => console.log('online!'))

//app.listen(3333, '0.0.0.0', () => {
   //console.log('Server is running on http://0.0.0.0:3333');
//});