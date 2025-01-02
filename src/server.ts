import express, { Request, Response, NextFunction } from 'express'
import { router } from './routes';
import 'express-async-errors'
import cors from 'cors';
import path from 'path'
import fileUpload from 'express-fileupload';

// o cors foi habilitado para que qualquer ip consiga fazer a requisiçao

const app = express();

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))
app.use(router);

//Acessar url da imagem ex: localhost:3333/files.nomes-imagem.png
 app.use('/files',  express.static(path.resolve(__dirname, '..', 'tmp')))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        // se for uma instancia do tipo erro
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error', 
        message: 'Internal server error.'
    })
})

app.listen(process.env.PORT, () => console.log('Servidor online!'))