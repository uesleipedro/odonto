import db from '../infra/database'
import { Empresa } from '../utils/types'

export class FormaPagamentoData {
  getFormaPagamento() {
    return db.query('SELECT * FROM odonto.forma_pagamento ')
  }
}
