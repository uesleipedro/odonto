import db from '../infra/database'

export class UserData {
  getUsers() {

    const response = db.query('SELECT * FROM odonto.user')
    return response
  }

  async getUserByEmpresa(id_empresa: number) {
    return db.query('SELECT id_user as value, nome as label FROM odonto.user WHERE id_empresa = $1', [id_empresa])
  }
  async getUserByEmpresa2(id_empresa: number) {
    return db.query(`
      SELECT 
        u.email,
        u.nome,
        u.id_empresa,
        u.id_user,
        u.senha,
        u.access_levels,
        u.token_to_reset_password,
        al.level_name,
        u.status
      FROM 
        odonto.user u 
      INNER JOIN odonto.access_levels al 
        ON al.access_level_id = u.access_levels
      WHERE u.id_empresa = $1`,
      [id_empresa])
  }

  async existUser(email: string) {
    return await db.oneOrNone(`SELECT * from odonto.user WHERE email = $1`, [email])
  }

  async getUserByEmail(email: string) {
    return await db.oneOrNone(`
      SELECT 
        u.id_user,
	      u.email,
	      u.nome,
	      u.senha,
	      u.id_empresa,
        u.token_to_reset_password,
        u.status,
	      e.razao_social,
	      e.nome_fantasia,
	      e.cnpj_cpf,
        e.cep,
        e.logradouro,
        e.bairro,
        e.cidade,
        e.uf,
        e.numero,
        e.celular,
        e.email,
        u.access_levels,
        al.acessa_todas_agendas,
        al.acessa_financeiro_paciente
      FROM odonto.user u
      INNER JOIN odonto.empresa e
        ON u.id_empresa = e.id_empresa
      INNER JOIN odonto.access_levels al 
        ON al.access_level_id = u.access_levels
      WHERE u.email= $1
      `, [email]
    )
  }

  async updateUser(user: any) {
    let a = await db.none(`UPDATE odonto.user SET email = $1, nome = $2, senha = $3, access_levels = $4, schedule_color = $5  WHERE id_user =$7 AND id_empresa = $6`,
      [user.email, user.nome, user.senha, Number(user.access_levels), user.schedule_color, Number(user.id_empresa), Number(user.id_user)])
  }

  async updateUserStatus(user: any) {
    let a = await db.none(`UPDATE odonto.user SET status = $1 WHERE id_user =$2 AND id_empresa = $3`,
      [user.status, Number(user.id_user), Number(user.id_empresa)])
  }


  async addTokenResetPassword(email: string, token: string) {
    return await db.oneOrNone(`UPDATE odonto.user SET token_to_reset_password = $2 WHERE email = $1 RETURNING *`,
      [email, token])
  }

  async updatePassword(email: string, senha: string) {
    return db.none(`UPDATE odonto.user SET senha = $2 WHERE email =$1`,
      [email, senha])
  }

  async deleteUser(data: any) {
    try {
      await db.none('DELETE FROM odonto.user WHERE id_user = $1 AND id_empresa = $2',
        [Number(data.id_user), Number(data.id_empresa)])
      return { success: true, message: "Usuário excluído com sucesso" }
    } catch (e: any) {
      if (e.code === '23503') {
        return { success: false, message: 'Não é possível excluir o usuário. Existe referência em outra tabela.' }
      }
      return { success: false, message: 'Erro ao excluir o usuário.', error: e.message }

    }
  }

  saveUser(user: any) {
    return db.one('INSERT INTO odonto.user (email, nome, id_empresa, senha, access_levels) VALUES ($1, $2, $3, $4, $5) returning *',
      [user.email, user.nome, user.id_empresa, user.senha, user.access_levels])
  }
}
