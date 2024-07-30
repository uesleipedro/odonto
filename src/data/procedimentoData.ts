import db from '../infra/database'

export class ProcedimentoData {
    async getProcedimento() {
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
            p.id_procedimento_list,
            p.orcado
        FROM odonto.procedimento p
        WHERE orcado = false`)
    }

    async getProcedimentoById(id_procedimento: any) {
        return db.query(`SELECT * FROM odonto.procedimento WHERE id_procedimento = $1`, [id_procedimento])
    }

    async getProcedimentoByPaciente(id_paciente: number, id_empresa: number) {
        return db.query(`
        SELECT 
            odonto.procedimento.id_procedimento,
            dente,
            estado,
            observacao,
            id_profissional,
            face_dente,
            adicionado,
            odonto.procedimento.preco,
            odonto.procedimento_list.descricao as procedimento,
            odonto.procedimento_list.id_procedimento as id_procedimento_list,
            id_paciente,
            orcado
        FROM odonto.procedimento
        INNER JOIN odonto.procedimento_list
        ON odonto.procedimento.id_procedimento_list = odonto.procedimento_list.id_procedimento 
        WHERE
            orcado = false 
            AND id_paciente = $1
            AND odonto.procedimento.id_empresa = $2`, [id_paciente, id_empresa])
    }

    async saveProcedimento(procedimento: any) {
        return db.one('INSERT INTO odonto.procedimento (dente, face_dente, estado, observacao, id_profissional, adicionado, preco, id_procedimento_list, id_paciente, orcado, id_empresa ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false, $10) returning id_procedimento',
            [procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list, procedimento.id_paciente, procedimento.id_empresa])
    }

    async updateProcedimento(procedimento: any) {
        return db.none('UPDATE odonto.procedimento SET dente = $2, face_dente = $3, estado = $4, observacao = $5, id_profissional = $6, adicionado = $7, preco = $8, id_procedimento_list = $9, orcado = $10, id_paciente = $11, id_empresa = $12 WHERE id_procedimento = $1',
            [procedimento.id_procedimento, procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list, procedimento.orcado, procedimento.id_paciente, procedimento.id_empresa])
    }

    async estornoProcedimento(id_orcamento: any) {
        return db.none(`update odonto.procedimento set orcado = false where odonto.procedimento.id_procedimento in (SELECT id_procedimento FROM odonto.procedimento_orcamento WHERE id_orcamento = $1) `,
            [id_orcamento])
    }

    async updateStatusProcedimento(procedimento: any) {
        return db.none('UPDATE odonto.procedimento SET orcado = $2 WHERE id_procedimento = $1',
            [procedimento.id_procedimento, procedimento.orcado])
    }

    deleteProcedimento(id_procedimento: number) {

        return db.none('DELETE FROM odonto.procedimento WHERE id_procedimento = $1', [id_procedimento]);
    }

}
