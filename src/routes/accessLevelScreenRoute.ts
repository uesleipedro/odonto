import { Request, Response, Router } from 'express'
import { AccessLevelScreenController } from '../controllers/accessLevelScreenController'

const accessLevelScreenController = new AccessLevelScreenController()
const router = Router()

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await accessLevelScreenController.getAccessLevelScreen(req.query)
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
});


router.post('/', async function (req: Request, res: Response, next) {
    try {
       const response = await accessLevelScreenController.saveAccessLevelScreen(req.body)
       res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

export default router
