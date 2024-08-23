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

router.get('/paciente', async (req: Request, res: Response, next) => {
    try {
        const response = await orcamentoController.getOrcamentoByPacienet(req.query)
        res.json(response)
    } catch (e) {
        next(e)
    }
});

router.get('/view/:id_orcamento/:id_empresa', async (req: Request, res: Response, next) => {
  try {
    const response = await orcamentoController.getOrcamentoView(Number(req.params.id_orcamento), Number(req.params.id_empresa))
    res.json(response)
  } catch (e) {
    next(e)
  }
})

router.put('/status', async function (req: Request, res: Response, next) {
    try {
        const response = await orcamentoController.updateStatusOrcamento(req.body)
        res.status(201).json(response)
    } catch (e: any) {
        next(e)
    }
});

router.put('/estornar/:id_orcamento', async function (req: Request, res: Response, next) {
    try {
        const response = await orcamentoController.estornarOrcamento(req.params.id_orcamento)
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

router.delete('/:id_orcamento', async (req: Request, res: Response) => {
    console.log('delete route', req.params.id_orcamento)
    const response = await orcamentoController.deleteOrcamento(Number(req.params.id_orcamento))
    res.status(204).json(response)
})

export default router
