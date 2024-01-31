import { Request, Response, Router } from 'express';
import { DenteController } from '../controllers/denteController';

const denteController = new DenteController();
const router = Router();

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await denteController.getDentes();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
})

// router.post('/', async function (req: Request, res: Response, next) {
//     try {
//        const response = await pacienteController.savePaciente(req.body)
//        res.status(201).json(response)
//     } catch (e: any) {
//         next(e)
//     }
// })

// router.delete('/:id_paciente', async (req: Request, res: Response) => {
//     const response = await pacienteController.deletePaciente(Number(req.params.id_paciente))
//     res.status(204).json(response)
// })


export default router