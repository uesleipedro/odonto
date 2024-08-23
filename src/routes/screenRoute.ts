import { Request, Response, Router } from 'express'
import { ScreenController } from '../controllers/screenController'

const screenController = new ScreenController()
const router = Router()

router.get('/:id_empresa', async function (req: Request, res: Response, next) {
    try {
        const response = await screenController.getScreens(Number(req.params.id_empresa))
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
})

export default router
