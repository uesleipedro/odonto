import { Request, Response, Router } from 'express'
import { ContasReceberController } from '../controllers/contasReceberController'

const contasReceberController = new ContasReceberController()
const router = Router()

router.put('/finalizar', async function (req: Request, res: Response, next) {
    try {
        const response = await contasReceberController.updateDataPagamento(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

router.get('/paciente/:id_paciente', async (req: Request, res: Response, next) => {
    try {
        const response = await contasReceberController.getContasReceberByPaciente(Number(req.params.id_paciente));
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.put('/estornar', async function (req: Request, res: Response, next) {
    try {
        const response = await contasReceberController.estornoPagamento(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await contasReceberController.saveContaReceber(req.body)
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

// router.put('/estorno/:id_orcamento', async function (req: Request, res: Response, next) {
//     try {
//         const response = await procedimentoController.estornoProcedimento(req.params.id_orcamento)
//         res.status(201).json(response)
//     } catch (e: any) {
//         next(e)
//     }
// });

// router.put('/status', async function (req: Request, res: Response, next) {
//     try {
//         const response = await procedimentoController.updateStatusProcedimento(req.body)
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
