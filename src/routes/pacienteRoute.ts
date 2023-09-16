import { Request, Response, Router } from 'express';
import { PacienteController } from '../controllers/pacienteController';

const pacienteController = new PacienteController();
const router = Router();

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await pacienteController.getPacientes();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
       const response = await pacienteController.savePaciente(req.body);
       res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

export default router