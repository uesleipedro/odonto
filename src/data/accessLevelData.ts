import db from '../infra/database'

export class AccessLevelData {

  getAccessLevels(id_empresa: number) {
    const response = db.query(`
      SELECT 
        al.access_level_id,
        al.level_name,
        al.description,
        al.acessa_todas_agendas,
        al.acessa_financeiro_paciente,
        COALESCE(json_agg(
          json_build_object(
            'value', als.id_screen,
            'label', s.path
          )
        ) FILTER (WHERE als.id_screen IS NOT NULL), '[]') AS screens
      FROM odonto.access_levels al
      LEFT JOIN odonto.access_levels_screen als ON al.access_level_id = als.id_access_levels
      LEFT JOIN odonto.screen s ON als.id_screen = s.id_screen
      WHERE al.id_empresa = $1
      GROUP BY al.access_level_id
      ORDER BY al.level_name ASC`
      , [id_empresa])
    return response
  }

  saveAccessLevel(access_level: any) {
    return db.one('INSERT INTO odonto.access_levels (level_name, description, id_empresa, acessa_todas_agendas, acessa_financeiro_paciente) VALUES ($1, $2, $3, $4, $5) returning *',
      [access_level.level_name, access_level.description, access_level.id_empresa, access_level.acessa_todas_agendas, access_level.acessa_financeiro_paciente])
  }

  async deleteAccessLevel(access_level: any) {
    //return
    try {
      const resultado = await db.oneOrNone('DELETE FROM odonto.access_levels WHERE access_level_id = $1 AND id_empresa = $2 RETURNING *', [Number(access_level.access_level_id), Number(access_level.id_empresa)])
      return {
        status: 'sucesso',
        data: resultado
      }
    } catch (err: any) {
      // Verifica se é um erro de chave estrangeira (23503)
      if (err.code === '23503') {
        return {
          status: 'erro',
          message: 'Algum usuário está utilizando este nível de acesso. A exclusão só pode ser realizada se ninguém estiver utilizando!',
          error: err.detail
        }
      }

      // Tratar outros erros genéricos
      return {
        status: 'erro',
        message: 'Ocorreu um erro ao inserir os dados.',
        error: err.message,
        errorcode: err.code,
      }
    }
  }

  async updateAccessLevel(access_level: any) {
    await this.deleteAccessLevelScreen(access_level)

    return await db.none(`UPDATE odonto.access_levels SET level_name = $1, description = $2, acessa_todas_agendas = $5, acessa_financeiro_paciente = $6 WHERE access_level_id = $3 AND id_empresa = $4`,
      [access_level.level_name, access_level.description, access_level.access_level_id, access_level.id_empresa, access_level.acessa_todas_agendas, access_level.acessa_financeiro_paciente])
  }

  async deleteAccessLevelScreen(access_level: any) {
    return db.none('DELETE FROM odonto.access_levels_screen WHERE id_access_levels = $1 AND id_empresa = $2', [Number(access_level.access_level_id), Number(access_level.id_empresa)])
  }

}
