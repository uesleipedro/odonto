import db from '../infra/database';

export class UserData {
  getUsers() {
    const response = db.query('SELECT * FROM odonto.user');
    return response;
  };

  getUserByEmail(email: string) {

    return db.oneOrNone('SELECT * FROM odonto.user WHERE email = $1', [email]);
  };

  saveUser(user: any) {

    return db.one('INSERT INTO odonto.user (email, nome, id_empresa, senha) VALUES ($1, $2, $3, $4) returning *',
      [user.email, user.nome, user.id_empresa, user.senha]);
  };
}
