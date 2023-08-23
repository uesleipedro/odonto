import { Request, Response, Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';

const usuarioController = new UsuarioController();
const router = Router();

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await usuarioController.getUsers();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});


router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await usuarioController.saveUser(req.body);
        res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

export default router;
