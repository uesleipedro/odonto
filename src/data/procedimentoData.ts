import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class ProcedimentoData {
    getProcedimento() {
        // return db.query('SELECT * FROM odonto.agenda')
        return db.query(`
        SELECT  
            p.id_procedimento,
            (select descricao from odonto.procedimento_list where id_procedimento = p.id_procedimento_list) as procedimento,
            p.dente,
            p.estado,
            p.observacao,
            p.id_profissional,
            p.face_dente,
            p.adicionado,
            p.preco,
            p.id_procedimento_list
        FROM odonto.procedimento p`)
    }

    getProcedimentoById(id_procedimento: any) {
        return db.query(`SELECT * FROM odonto.procedimento WHERE id_procedimento = $1`, [id_procedimento])
    }

    getProcedimentoByPaciente(id_paciente: any) {
        console.log('entrou data', id_paciente)
        return db.query(`SELECT * FROM odonto.procedimento WHERE id_paciente = $1`, [id_paciente])
    }

    async saveProcedimento(procedimento: any) {
console.log('pararparparpar --- ', procedimento)
        return db.one('INSERT INTO odonto.procedimento (dente, face_dente, estado, observacao, id_profissional, adicionado, preco, id_procedimento_list, id_paciente ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id_procedimento',
            [procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list, procedimento.id_paciente])
    }

    async updateProcedimento(procedimento: any) {
        return db.none('UPDATE odonto.procedimento SET dente = $2, face_dente = $3, estado = $4, observacao = $5, id_profissional = $6, adicionado = $7, preco = $8, id_procedimento_list = $9 WHERE id_procedimento = $1',
            [procedimento.id_procedimento, procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list])
    }

    deleteProcedimento(id_procedimento: number) {

        return db.none('DELETE FROM odonto.procedimento WHERE id_procedimento = $1', [id_procedimento]);
    }

}