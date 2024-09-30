import { Request, Response, Router } from 'express'
import { WppSessionController } from '../controllers/wppSessionController'

const wppSessionController = new WppSessionController()
const router = Router()

router.get('/', async function(req: Request, res: Response, next) {
  try {
    const response = await wppSessionController.getWppSession(req.query)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.delete('/', async (req: Request, res: Response) => {
  const response = await wppSessionController.deleteWppSession(req.query)
  res.status(204).json(response)
})

router.post('/', async function(req: Request, res: Response, next) {
  try {
    const response = await wppSessionController.saveWppSession(req.body)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})

export default router
