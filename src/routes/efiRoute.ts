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

router.post('/createCarnet', async function(req: Request, res: Response, next) {
  try {
    const response = await efiController.createCarnet(req.body)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.get('/listaBoletos', async function(req: Request, res: Response, next) {
  try {
    const response = await efiController.listaBoletos(Number(req.query.id_empresa))
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.get('/listaCarnes', async function(req: Request, res: Response, next) {
  try {
    const response = await efiController.listaCarnes(Number(req.query.id_empresa))
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.put('/cancelaBoleto', async function(req: Request, res: Response, next) {
  try {
    const response = await efiController.cancelaBoleto(req.body)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

export default router
