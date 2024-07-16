import db from '../infra/database'
import { Empresa } from '../utils/types'

export class ContasReceberData {

  getContasReceberByPaciente(id_paciente: any) {
    return db.query(`SELECT * FROM odonto.contas_receber WHERE id_paciente = $1 ORDER BY id_pagamento DESC, nr_parcela ASC`, [id_paciente])
  }

  async updateDataPagamento(pagamento: any) {
    return db.none('UPDATE odonto.contas_receber SET status = $3, dt_recebimento = $4 WHERE id_pagamento = $1 AND nr_parcela = $2',
      [pagamento.id_pagamento, pagamento.nr_parcela, pagamento.status, pagamento.dt_recebimento])
  }

  async estornoPagamento(dados: any) {
    return db.none(`UPDATE odonto.contas_receber SET status = 'Cancelado' WHERE id_pagamento = $1 AND nr_parcela = $2`,
      [dados.id_pagamento, dados.nr_parcela])
  }

  saveContaReceber(conta: any) {
    console.log(" CONTAS RECEBER: ", conta)
    return db.one('INSERT INTO odonto.contas_receber (id_pagamento, nr_parcela, valor, dt_vencimento, status, id_paciente) VALUES ($1, $2, $3, $4, $5, $6) returning *',
      [conta.id_pagamento, conta.nr_parcela, conta.valor, conta.dt_vencimento, conta.status, conta.id_paciente]);
  }

  async deleteContasReceber(id_pagamento: number) {

    return db.none('DELETE FROM odonto.contas_receber WHERE id_pagamento = $1', [id_pagamento]);
  }

}
