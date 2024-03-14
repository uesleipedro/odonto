import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class PagamentoData {
    getPagamento() {
        return db.query(`SELECT * FROM odonto.pagamento`)
    }

    getPagamentoByPaciente(id_paciente: any) {
        return db.query(`SELECT * FROM odonto.pagamento WHERE id_pagamento = $1`, [id_paciente])
    }

    async savePagamento(pagamento: any) {

        return db.one('INSERT INTO odonto.pagamento (id_empresa, id_orcamento, tipo_desconto, valor_desconto, quantidade_parcelas, data_primeiro_vencimento, entrada, data_pagamento, valor_total, status, id_paciente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id_pagamento',
            [pagamento.id_empresa, pagamento.id_orcamento, pagamento.tipo_desconto, pagamento.valor_desconto, pagamento.quantidade_parcelas, pagamento.data_primeiro_vencimento, pagamento.entrada, pagamento.data_pagamento, pagamento.valor_total, pagamento.status, pagamento.id_paciente])
    }

    // async updateProcedimento(procedimento: any) {
    //     return db.none('UPDATE odonto.procedimento SET dente = $2, face_dente = $3, estado = $4, observacao = $5, id_profissional = $6, adicionado = $7, preco = $8, id_procedimento_list = $9 WHERE id_procedimento = $1',
    //         [procedimento.id_procedimento, procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list])
    // }

    // deleteProcedimento(id_procedimento: number) {

    //     return db.none('DELETE FROM odonto.procedimento WHERE id_procedimento = $1', [id_procedimento]);
    // }

}