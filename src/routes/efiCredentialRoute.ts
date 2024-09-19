import { Request, Response, Router } from 'express'
import { EfiCredentialController } from '../controllers/efiCredentialController'

const efiCredentialController = new EfiCredentialController()
const router = Router()

router.get('/getCredential', async function(req: Request, res: Response, next) {
  try {
    const response = await efiCredentialController.getEfiCredential(Number(req.query.id_empresa))
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})


router.post('/saveCredential', async function(req: Request, res: Response, next) {
  try {
    const response = await efiCredentialController.saveEfiCredential(req.body)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})

router.put('/updateCredential', async function(req: Request, res: Response, next) {
  try {
    const response = await efiCredentialController.updateEfiCredential(req.body)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})

router.delete('/', async (req: Request, res: Response) => {
  const response = await efiCredentialController.deleteEfiCredential(req.query)
  res.status(204).json(response)
})

export default router
