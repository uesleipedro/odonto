import db from '../infra/database';

export class UsuarioData {
    getUsers() {
      const response = db.query('SELECT * FROM odonto.usuario');
      return response;
    };


    saveUser(user: any) {

      return db.one('INSERT INTO odonto.usuario (email, nome, fk_id_empresa, senha) VALUES ($1, $2, $3, $4) returning *', 
        [user.email, user.nome, user.fk_id_empresa, user.senha]);
    };
}
