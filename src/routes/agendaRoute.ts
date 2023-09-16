import { Request, Response, Router } from 'express'
import { AgendaController } from '../controllers/agendaController'

const agendaController = new AgendaController()
const router = Router()

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await agendaController.getAgenda()
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
       const response = await agendaController.saveAgenda(req.body)
       res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

export default router