import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class ProcedimentoData {
    getProcedimento() {
        // return db.query('SELECT * FROM odonto.agenda')
        return db.query(`SELECT * FROM odonto.procedimento`)
    }

    async saveProcedimento(procedimento: any) {

        return db.one('INSERT INTO odonto.procedimento (dente, face_dente, estado, observacao, id_profissional, adicionado ) VALUES ($1, $2, $3, $4, $5, $6) returning id_procedimento',
            [procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado])
    }

    deleteProcedimento(id_procedimento: number) {

        return db.none('DELETE FROM odonto.procedimento WHERE id_procedimento = $1', [id_procedimento]);
    }

}