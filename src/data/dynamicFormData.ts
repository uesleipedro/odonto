import db from '../infra/database'

export class DynamicFormData {

  async getDynamicForm(data: any) {
    return await db.query(`
      SELECT 
        f.id_dynamic_field,
        f.form_id,
        f.field_name,
        f.type,
        fo.name as form_name
      FROM odonto.dynamic_field f
      INNER JOIN odonto.dynamic_form fo
        ON f.form_id = fo.id_form
      WHERE f.id_empresa = $1 and f.form_id = $2
      `,
      [data.id_empresa, data.id_form])
  }

  async getFormList(data: any) {
    return await db.query(`
      SELECT 
        *
      FROM odonto.dynamic_form
      WHERE id_empresa = $1
      `,
      [data.id_empresa])
  }

  async saveDynamicForm(form: any) {

    const { formName, fields, id_empresa } = form.body

    try {
      const form = await db.tx(async t => {
        const formResult = await t.one(
          'INSERT INTO odonto.dynamic_form (name, id_empresa) VALUES ($1, $2) RETURNING id_form',
          [formName, id_empresa]
        )

        const formId = formResult.id_form

        const fieldQueries = fields.map((field: any) => {
          return t.none(
            'INSERT INTO odonto.dynamic_field (form_id, name, type, id_empresa) VALUES ($1, $2, $3, $4)',
            [formId, field.name, field.type, id_empresa]
          )
        })

        await t.batch(fieldQueries)

        return formResult
      })

      return form
    } catch (error: any) {
      console.error('Error creating form:', error);
      return error?.message
    }
  }

  async saveDynamicFormData(data: any) {
    try {
      await db.none(
        'INSERT INTO odonto.form_dynamic_data (form_id, data, id_empresa) VALUES ($1, $2, $3)',
        [data.form_id, data.data, data.id_empresa]
      );

      return
    } catch (error) {
      console.error('Error submitting form data:', error)
      return { message: 'Erro ao submeter os dados do formulário' }
    }
  }

  /*async deleteAccessLevel(access_level: any) {
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
  }*/

}
