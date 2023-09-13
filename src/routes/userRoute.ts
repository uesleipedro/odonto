import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/userController';

const userController = new UserController();
const router = Router();

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await userController.getUsers();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/:email', async function (req: Request, res: Response, next) {
    try {
        const response = await userController.getUserByEmail(String(req.params.email));
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
       const response = await userController.saveUser(req.body);
       res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

router.post('/login', async function (req: Request, res: Response, next) {
    try {
        const response = await userController.login(req.body);
        res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

export default router;
