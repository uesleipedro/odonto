import { Request, Response, Router } from 'express'
import { FormaPagamentoController } from '../controllers/formaPagamentoController'

const formaPagamentoController = new FormaPagamentoController()
const router = Router()

router.get('/', async function(req: Request, res: Response, next) {
  try {
    const response = await formaPagamentoController.getFormaPagamento()
    res.status(200).json(response)
  } catch (e) {
    next(e)
  }
})

export default router
