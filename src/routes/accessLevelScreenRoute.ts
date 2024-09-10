import { Request, Response, Router } from 'express'
import { AccessLevelScreenController } from '../controllers/accessLevelScreenController'

const accessLevelScreenController = new AccessLevelScreenController()
const router = Router()

router.get('/', async function(req: Request, res: Response, next) {
  try {
    const response = await accessLevelScreenController.getAccessLevelScreen(req.query)
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})


router.post('/', async function(req: Request, res: Response, next) {
  try {
    const response = await accessLevelScreenController.saveAccessLevelScreen(req.body)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})
/*
router.put('/', async function(req: Request, res: Response) {
  try {
    const response = await accessLevelScreenController.updateAccessLevelScreen(req.query)
    res.status(201).json(response)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
})
*/
router.delete('/', async (req: Request, res: Response) => {
  const response = await accessLevelScreenController.deleteAccessLevelScreen(req.query)
  res.status(204).json(response)
})

export default router
