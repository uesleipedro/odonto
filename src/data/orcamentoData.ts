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

    getOrcamentoByPaciente(id_paciente: any) {
        return db.query(`SELECT * FROM odonto.orcamento WHERE id_paciente = $1`, [id_paciente])
    }

    async saveOrcamento(orcamento: any) {

        return db.one('INSERT INTO odonto.orcamento (id_empresa, id_profissional, id_paciente, preco, date, status) VALUES ($1, $2, $3, $4, NOW(), $5) returning id_orcamento',
            [orcamento.id_empresa, orcamento.id_profissional, orcamento.id_paciente, orcamento.preco, orcamento.status])
    }

    async updateStatusOrcamento(orcamento: any) {
        console.log('-------------------- DATA ', orcamento, orcamento.id_orcamento, orcamento.status)
        return db.none('UPDATE odonto.orcamento SET status = $2 WHERE id_orcamento = $1',
            [orcamento.id_orcamento, orcamento.status])
    }

    async estornarOrcamento(id_orcamento: any) {
        return db.none(`UPDATE odonto.orcamento SET status = 'Pendente pagamento' WHERE id_orcamento = $1`,
            [id_orcamento])
    }

    deleteOrcamento(id_orcamento: number) {
        console.log("delete data ", id_orcamento)
        return db.none('DELETE FROM odonto.orcamento WHERE id_orcamento = $1', [id_orcamento]);
    }

}