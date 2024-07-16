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

router.put('/', async function (req: Request, res: Response, next) {
    try {
        const response = await agendaController.updateAgenda(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
})

router.put('/updateDataHora', async function (req: Request, res: Response, next) {
    try {
        const response = await agendaController.updateDataHora(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
})

 router.delete('/:id_agenda', async (req: Request, res: Response) => {
     const response = await agendaController.deleteAgenda(Number(req.params.id_agenda))
     res.status(204).json(response)
 })

export default router
