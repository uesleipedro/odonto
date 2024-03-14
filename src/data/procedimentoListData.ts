import db from '../infra/database'
//import { Empresa } from '../utils/types'

export class ProcedimentoListData {
    getProcedimentoList() {
        // return db.query('SELECT * FROM odonto.agenda')
        return db.query(`SELECT id_procedimento as value, descricao || ' - ' || categoria as label  FROM odonto.procedimento_list order by id_procedimento`)
    }

    getProcedimentoById(id_paciente: number) {
        return db.query(`SELECT id_procedimento as value, descricao || ' - ' || categoria as label  FROM odonto.procedimento_list WHERE id_paciente = $1 order by id_procedimento`, [id_paciente])
    }

    async saveProcedimentoList(procedimento_list: any) {

        return db.one('INSERT INTO odonto.procedimento_list (dente, face_dente, estado, observacao, id_profissional, adicionado ) VALUES ($1, $2, $3, $4, $5, $6) returning id_procedimento_list',
            [procedimento_list.dente])
    }

    deleteProcedimentoList(id_procedimento_list: number) {

        return db.none('DELETE FROM odonto.procedimento_list WHERE id_procedimento_list = $1', [id_procedimento_list]);
    }

}