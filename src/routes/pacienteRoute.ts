import { Request, Response, Router } from 'express';
import { PacienteController } from '../controllers/pacienteController';

const pacienteController = new PacienteController();
const router = Router();

router.get('/:id_empresa', async function (req: Request, res: Response, next) {
    try {
        const response = await pacienteController.getPacientes(Number(req.params.id_empresa));
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
})

router.get('/one/:id_paciente/:id_empresa', async (req: Request, res: Response, next) => {
    try {
        const response = await pacienteController.getPacienteById(Number(req.params.id_paciente), Number(req.params.id_empresa));
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
})

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await pacienteController.savePaciente(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
})

router.put('/', async function (req: Request, res: Response, next) {
    try {
        const response = await pacienteController.updatePaciente(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
})

router.delete('/:id_paciente', async (req: Request, res: Response) => {
    const response = await pacienteController.deletePaciente(Number(req.params.id_paciente))
    res.status(204).json(response)
})


export default router
