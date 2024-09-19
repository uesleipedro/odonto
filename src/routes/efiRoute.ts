import { Request, Response, Router } from 'express'
import { EfiController } from '../controllers/efiController'

const efiController = new EfiController()
const router = Router()

router.post('/createBoleto', async function(req: Request, res: Response, next) {
  try {
    const response = await efiController.createBoleto(req.body)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.get('/listaBoletos', async function(req: Request, res: Response, next) {
  try {
    const response = await efiController.listaBoletos()
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

export default router
