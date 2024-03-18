import { Request, Response, Router } from 'express'
import { OrcamentoController } from '../controllers/orcamentoController'

const orcamentoController = new OrcamentoController()
const router = Router()

router.get('/', async function (req: Request, res: Response, next) {
    console.log('entrou route')
    try {
        const response = await orcamentoController.getOrcamento()
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
});

router.get('/paciente/:id_paciente', async (req: Request, res: Response, next) => {
    try {
        const response = await orcamentoController.getOrcamentoByPacienet(Number(req.params.id_paciente));
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.put('/status', async function (req: Request, res: Response, next) {
    try {
        const response = await orcamentoController.updateStatusOrcamento(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await orcamentoController.saveOrcamento(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

// router.put('/', async function (req: Request, res: Response, next) {
//     try {
//         const response = await procedimentoController.updateProcedimento(req.body)
//         res.status(201).json(response)
//     } catch (e: any) {
//         next(e)
//     }
// });

// router.delete('/:id_procedimento', async (req: Request, res: Response) => {
//     const response = await procedimentoController.deleteProcedimento(Number(req.params.id_procedimento))
//     res.status(204).json(response)
// })

export default router
