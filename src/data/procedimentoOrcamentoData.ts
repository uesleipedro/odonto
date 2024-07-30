import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class ProcedimentoOrcamentoData {
    getProcedimentoOrcamento() {
        return db.query(`
        SELECT * FROM odonto.procedimento_orcamento`)
    }

    getProcedimentoByOrcamento(id_orcamento: any) {
        return db.query(`SELECT 
            id_orcamento, 
            SUM (preco) 
        FROM 
            odonto.procedimento_orcamento
        GROUP BY 
            id_orcamento
        ORDER BY 
            id_orcamento;`, [id_orcamento])
    }

    async saveProcedimentoOrcamento(procedimento_orcamento: any) {

        return db.one('INSERT INTO odonto.procedimento_orcamento (id_procedimento, id_orcamento, preco, id_empresa ) VALUES ($1, $2, $3, $4) returning id_orcamento',
            [procedimento_orcamento.id_procedimento, procedimento_orcamento.id_orcamento, procedimento_orcamento.preco, procedimento_orcamento.id_empresa])
    }

    async updateProcedimento(procedimento: any) {
        return db.none('UPDATE odonto.procedimento SET dente = $2, face_dente = $3, estado = $4, observacao = $5, id_profissional = $6, adicionado = $7, preco = $8, id_procedimento_list = $9 WHERE id_procedimento = $1',
            [procedimento.id_procedimento, procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list])
    }

    deleteProcedimentoOrcamentoByOrcamento(id_orcamento: number, id_empresa: number) {

        return db.none('DELETE FROM odonto.procedimento_orcamento WHERE id_orcamento = $1 AND id_empresa = $2', [id_orcamento, id_empresa]);
    }

}
