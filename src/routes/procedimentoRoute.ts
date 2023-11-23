import { Request, Response, Router } from 'express'
import { ProcedimentoController } from '../controllers/procedimentoController'

const procedimentoController = new ProcedimentoController()
const router = Router()

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await procedimentoController.getProcedimento()
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await procedimentoController.saveProcedimento(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

router.delete('/:id_procedimento', async (req: Request, res: Response) => {
    const response = await procedimentoController.deleteProcedimento(Number(req.params.id_procedimento))
    res.status(204).json(response)
})

export default router
