import { Request, Response, Router } from 'express'
import { EmpresaController } from '../controllers/empresaController'

const empresaController = new EmpresaController()
const router = Router()

router.get('/', async function(req: Request, res: Response, next) {
  try {
    const response = await empresaController.getEmpresas()
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

router.get('/:id_empresa', async function(req: Request, res: Response, next) {
  try {
    const response = await empresaController.getEmpresaById(Number(req.params.id_empresa))
    res.json(response)
  } catch (e) {
    next(e)
  }
})

router.post('/', async function(req: Request, res: Response, next) {
  try {
    const response = await empresaController.saveEmpresa(req.body, next)
    res.status(201).json(response)
  } catch (e: any) {
    next(e)
  }
})


export default router

