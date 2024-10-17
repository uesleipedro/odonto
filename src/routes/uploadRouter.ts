import { Router, Request, Response, NextFunction } from "express"

const router = Router()

router.post('/image', async function(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    console.log('Arquivo enviado com sucesso:', req.file.filename);
    res.status(201).send('Arquivo enviado com sucesso');
  } else {
    console.error('Erro ao enviar arquivo.');
    res.status(400).send('Nenhum arquivo enviado');
  }
})

export default router
