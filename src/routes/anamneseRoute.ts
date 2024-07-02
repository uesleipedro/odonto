import { Request, Response, Router } from 'express';
import { AnamneseController } from '../controllers/anamneseController';

const anamneseController = new AnamneseController();
const router = Router();

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await anamneseController.getAnamneses();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
})

router.get('/:id_paciente', async (req: Request, res: Response, next) => {
    try {
        const response = await anamneseController.getAnamneseByPaciente(Number(req.params.id_paciente));
        res.json(response);
    } catch (e) {
        next(e);
    }
})

router.get('/check_exists/:id_paciente', async (req: Request, res: Response, next) => {
    try {
        console.log('route anamnese: entrou ')
        console.log('route anamnese: ', req.params.id_paciente)
        const response = await anamneseController.getCheckExists(Number(req.params.id_paciente));
        console.log('route anamnese response: ', response)
        res.json(response);
    } catch (e) {
        next(e);
    }
})

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await anamneseController.saveAnamnese(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
})

router.put('/', async function (req: Request, res: Response, next) {
    console.log('entrou na route')
    try {
        const response = await anamneseController.updateAnamnese(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
})

// router.delete('/:id_paciente', async (req: Request, res: Response) => {
//     const response = await pacienteController.deletePaciente(Number(req.params.id_paciente))
//     res.status(204).json(response)
// })


export default router