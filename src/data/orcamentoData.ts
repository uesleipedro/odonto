import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class OrcamentoData {
    getOrcamento() {
        return db.query(`
        SELECT  
            o.id_orcamento,
            o.id_empresa,
            o.id_profissional,
            (select nome from odonto.paciente where id_paciente = 1) as paciente,
            o.preco,
            o.date,
            o.status
        FROM odonto.orcamento o`)
    }

    // getProcedimentoById(id_procedimento: any) {
    //     return db.query(`SELECT * FROM odonto.procedimento WHERE id_procedimento = $1`, [id_procedimento])
    // }

    async saveOrcamento(orcamento: any) {

        return db.one('INSERT INTO odonto.orcamento (id_empresa, id_profissional, id_paciente, preco, date, status) VALUES ($1, $2, $3, $4, NOW(), $5) returning id_orcamento',
            [orcamento.id_empresa, orcamento.id_profissional, orcamento.id_paciente, orcamento.preco, orcamento.status])
    }

    // async updateProcedimento(procedimento: any) {
    //     return db.none('UPDATE odonto.procedimento SET dente = $2, face_dente = $3, estado = $4, observacao = $5, id_profissional = $6, adicionado = $7, preco = $8, id_procedimento_list = $9 WHERE id_procedimento = $1',
    //         [procedimento.id_procedimento, procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list])
    // }

    // deleteProcedimento(id_procedimento: number) {

    //     return db.none('DELETE FROM odonto.procedimento WHERE id_procedimento = $1', [id_procedimento]);
    // }

}