import db from '../infra/database'
import { Empresa } from '../utils/types'

export class ContasReceberData {

  getContasReceberByPaciente(id_paciente: number, id_empresa: number) {
    return db.query(`SELECT * FROM odonto.contas_receber WHERE id_paciente = $1 AND id_empresa = $2 ORDER BY id_pagamento DESC, nr_parcela ASC`, [id_paciente, id_empresa])
  }

  async updateDataPagamento(pagamento: any) {
    return db.none('UPDATE odonto.contas_receber SET status = $3, dt_recebimento = $4 WHERE id_pagamento = $1 AND nr_parcela = $2',
      [pagamento.id_pagamento, pagamento.nr_parcela, pagamento.status, pagamento.dt_recebimento])
  }

  async updateDadosBoleto(pagamento: any, boleto: any) {
    return db.none('UPDATE odonto.contas_receber SET expire_boleto_at = $4, link_boleto = $5, charge_id = $6 WHERE id_pagamento = $1 AND nr_parcela = $2 AND id_empresa = $3',
      [pagamento.id_pagamento, pagamento.nr_parcela, pagamento.id_empresa, boleto.expire_at, boleto.billet_link, boleto.charge_id])
  }


  async estornoPagamento(dados: any) {
    return db.none(`UPDATE odonto.contas_receber SET status = 'Cancelado' WHERE id_pagamento = $1 AND nr_parcela = $2`,
      [dados.id_pagamento, dados.nr_parcela])
  }

  saveContaReceber(conta: any) {
    return db.one('INSERT INTO odonto.contas_receber (id_pagamento, nr_parcela, valor, dt_vencimento, status, id_paciente, id_empresa, forma_pagamento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
      [conta.id_pagamento, conta.nr_parcela, conta.valor, conta.dt_vencimento, conta.status, conta.id_paciente, conta.id_empresa, conta.forma_pagamento])
  }

  async deleteContasReceber(id_pagamento: number) {

    return db.none('DELETE FROM odonto.contas_receber WHERE id_pagamento = $1', [id_pagamento])
  }

}
