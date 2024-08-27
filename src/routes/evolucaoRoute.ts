import { Request, Response, Router } from 'express'
import { EvolucaoController } from '../controllers/evolucaoController'

const evolucaoController = new EvolucaoController()
const router = Router()

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await evolucaoController.getEvolucoes(req.query)
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})


router.post('/', async function (req: Request, res: Response, next) {
    try {
       const response = await evolucaoController.saveEvolucao(req.body)
       res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
})

export default router
