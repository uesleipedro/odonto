import { FormaPagamentoData } from '../data/formaPagamentoData'

const formaPagamentoData = new FormaPagamentoData()

export class FormaPagamentoController {
  async getFormaPagamento() {
    return await formaPagamentoData.getFormaPagamento()
  }
}

