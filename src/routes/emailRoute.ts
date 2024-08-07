import { Request, Response, Router } from 'express'
import { EmailController } from '../controllers/emailController'

const emailController = new EmailController()
const router = Router();


router.post('/', async function (req: Request, res: Response, next) {
    try {
       const response = await emailController.sendEmail(req.body);
       res.status(201).json(response);
    } catch (e: any) {
        next(e)
    }
});

export default router;
