import { Request, Response, Router } from 'express'
import { ProcedimentoOrcamentoController } from '../controllers/procedimentoOrcamentoController'

const procedimentoOrcamentoController = new ProcedimentoOrcamentoController()
const router = Router()

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await procedimentoOrcamentoController.getProcedimentoOrcamento()
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
});

router.get('/:id_orcamento', async (req: Request, res: Response, next) => {
    try {
        const response = await procedimentoOrcamentoController.getProcedimentoByOrcamento(Number(req.params.id_orcamento));
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await procedimentoOrcamentoController.saveProcedimentoOrcamento(req.body)
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
