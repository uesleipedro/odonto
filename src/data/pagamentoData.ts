import db from '../infra/database'

export class PagamentoData {
    getPagamento() {
        return db.query(`SELECT * FROM odonto.pagamento`)
    }

    getPagamentoByPaciente(id_paciente: any) {
        return db.query(`SELECT * FROM odonto.pagamento WHERE id_paciente = $1 order by id_pagamento, nr_parcela`, [id_paciente])
    }

    async savePagamento(pagamento: any) {

        return db.one('INSERT INTO odonto.pagamento (id_empresa, id_orcamento, tipo_desconto, valor_desconto, quantidade_parcelas, data_primeiro_vencimento, entrada, data_pagamento, valor_total, status, id_paciente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id_pagamento',
            [pagamento.id_empresa, pagamento.id_orcamento, pagamento.tipo_desconto, pagamento.valor_desconto, pagamento.quantidade_parcelas, pagamento.data_primeiro_vencimento, pagamento.entrada, pagamento.data_pagamento, pagamento.valor_total, pagamento.status, pagamento.id_paciente])
    }

    async updateDataPagamento(pagamento: any) {
        return db.none('UPDATE odonto.pagamento SET status = $2, data_pagamento = $3 WHERE id_pagamento = $1',
            [pagamento.id_pagamento, pagamento.status, pagamento.data_pagamento])
    }

    async estornoPagamento(id_pagamento: any) {
        return db.none(`UPDATE odonto.pagamento SET status = 'Cancelado' WHERE id_pagamento = $1`,
            [id_pagamento])
    }

    async deletePagamento(id_orcamento: number) {
      try{     
        return await db.one('DELETE FROM odonto.pagamento WHERE id_orcamento = $1 RETURNING id_pagamento', [id_orcamento]);
      }catch(error: any){
        return error.message
      }
    }

}
