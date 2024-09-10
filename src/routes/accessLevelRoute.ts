import { Request, Response, Router } from 'express';
import { AccessLevelController } from '../controllers/accessLevelController';

const accessLevelController = new AccessLevelController()
const router = Router();

router.get('/:id_empresa', async function(req: Request, res: Response, next) {
  try {
    const response = await accessLevelController.getAccessLevels(Number(req.params.id_empresa))
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.post('/', async function(req: Request, res: Response, next) {
  try {
    const response = await accessLevelController.saveAccessLevel(req.body)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})


router.delete('/', async function(req: Request, res: Response, next) {
  try {
    const response = await accessLevelController.deleteAccessLevel(req.query)

    if (response.status === 'erro') {
      return res.status(400).json(response)
    }

    return res.status(201).json(response)
  } catch (e) {
    next(e)
  }
})

router.put('/', async function(req: Request, res: Response, next) {
  try {
    const response = await accessLevelController.updateAccessLevel(req.query)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})

export default router
