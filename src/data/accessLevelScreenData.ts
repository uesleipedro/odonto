import db from '../infra/database'
import pgPromise from 'pg-promise'
const pgp = pgPromise()

export class AccessLevelScreenData {

  async getAccessLevelScreen(dados: any) {
    const response = await db.query(`
      SELECT 
        array_agg(DISTINCT s.path) AS path
      FROM 
      odonto.access_levels_screen als
      INNER JOIN odonto.screen s ON als.id_screen = s.id_screen
      WHERE als.id_empresa = $1 AND als.id_access_levels = $2`,
      [dados.id_empresa, dados.id_access_levels])
    
    return response[0]?.path
  }
 
  async saveAccessLevelScreen(data: any) {
    /*return db.one('INSERT INTO odonto.access_levels_screen (id_access_levels, id_screen, id_empresa) VALUES ($1, $2, $3) returning *',
      [data.id_access_levels, data.id_screen, data.id_empresa])
  }*/
  
  // Supondo que o objeto `data` contenha um array chamado `screens`
  const screens = data.screens;

  // Definindo as colunas e a tabela para a inserção
  const columnSet = new pgp.helpers.ColumnSet(
    ['id_access_levels', 'id_screen', 'id_empresa'], 
    { table: { table: 'access_levels_screen', schema: 'odonto' } }
  );

  // Gerando a query para inserção em massa
  const query = pgp.helpers.insert(screens, columnSet);

  try {
    // Iniciando a transação
    await db.tx(async t => {
      // Executando a query de inserção em massa dentro da transação
      await t.none(query);
    });

    console.log('Inserção em massa realizada com sucesso.');

  } catch (error) {
    console.error('Erro ao realizar a inserção em massa:', error);
    throw error;  // Re-throw the error to handle it in the calling code if needed
  }
}}
