import { Request, Response, Router } from 'express'
import { ProcedimentoListController } from '../controllers/procedimentoListController'

const procedimentoListController = new ProcedimentoListController()
const router = Router()

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await procedimentoListController.getProcedimentoList()
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
});

router.get('/:id_paciente', async function (req: Request, res: Response, next) {
    try {
        const response = await procedimentoListController.getProcedimentoById(Number(req.params.id_paciente))
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await procedimentoListController.saveProcedimentoList(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

router.delete('/:id_procedimento_list', async (req: Request, res: Response) => {
    const response = await procedimentoListController.deleteProcedimentoList(Number(req.params.id_procedimento_list))
    res.status(204).json(response)
})

export default router
