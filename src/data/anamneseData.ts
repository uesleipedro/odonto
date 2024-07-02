import db from '../infra/database'

export class AnamneseData {
  getAnamneses() {
    return db.query('SELECT * FROM odonto.anamnese')
  }

  getAnamneseById(id_anamnese: number) {

    return db.oneOrNone('SELECT * FROM odonto.anamnese WHERE id_anamnese = $1', [id_anamnese])
  }

  getAnamneseByPaciente(id_paciente: number) {

    return db.oneOrNone('SELECT * FROM odonto.anamnese WHERE id_paciente = $1', [id_paciente])
  }

  getCheckExistes(id_paciente: number) {

    return db.oneOrNone('SELECT count(*) FROM odonto.anamnese WHERE id_paciente = $1', [id_paciente])
  }

  saveAnamnese(anamnese: any) {

    return db.one('INSERT INTO odonto.anamnese (id_paciente, doenca, descricao_doenca, tratamento_medico, gravidez, mes_gravidez, uso_medicacao, descricao_medicacoes, nome_medico_assistente, telefone_medico_assistente, alergia, descricao_alergia, fuma, bebe, pratica_exercicio, ja_foi_operado, descricao_operacao, problema_cicatrizacao, problema_anestesia, problema_hemorragia, doenca_reumatica, problema_cardiaco, problema_renal, problema_gastrico, problema_alergico, problemas_articulares_reumatismo, diabetes, hipertensao, outra, descricao_outra, historico_familiar_doenca, descricao_historico_familiar_doenca ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32) returning *',
      [anamnese.id_paciente, anamnese.doenca, anamnese.descricao_doenca, anamnese.tratamento_medico, anamnese.gravidez, anamnese.mes_gravidez, anamnese.uso_medicacao, anamnese.descricao_medicacoes, anamnese.nome_medico_assistente, anamnese.telefone_medico_assistente, anamnese.alergia, anamnese.descricao_alergia, anamnese.fuma, anamnese.bebe, anamnese.pratica_exercicio, anamnese.ja_foi_operado, anamnese.descricao_operacao, anamnese.problema_cicatrizacao, anamnese.problema_anestesia, anamnese.problema_hemorragia, anamnese.doenca_reumatica, anamnese.problema_cardiaco, anamnese.problema_renal, anamnese.problema_gastrico, anamnese.problema_alergico, anamnese.problemas_articulares_reumatismo, anamnese.diabetes, anamnese.hipertensao, anamnese.outra, anamnese.descricao_outra, anamnese.historico_familiar_doenca, anamnese.descricao_historico_familiar_doenca]);
  }

  async updateAnamnese(anamnese: any) {
    console.log('entrou no DATA')
    return db.none('UPDATE odonto.anamnese SET id_paciente = $2, doenca = $3, descricao_doenca = $4, gravidez = $5, mes_gravidez = $6, uso_medicacao = $7, descricao_medicacoes = $8, nome_medico_assistente = $9, telefone_medico_assistente = $10, alergia = $11, descricao_alergia = $12, fuma = $13, bebe = $14, pratica_exercicio = $15, ja_foi_operado = $16, descricao_operacao = $17, problema_anestesia = $18, problema_hemorragia = $19, doenca_reumatica = $20, problema_cardiaco = $21, problema_renal = $22, problema_gastrico = $23, problema_alergico = $24, problemas_articulares_reumatismo = $25, diabetes = $26, hipertensao = $27, outra = $28, descricao_outra = $29, problema_cicatrizacao = $30, tratamento_medico = $31, historico_familiar_doenca = $32, descricao_historico_familiar_doenca = $33 WHERE id_anamnese = $1',
      [anamnese.id_anamnese, anamnese.id_paciente, anamnese.doenca, anamnese.descricao_doenca, anamnese.gravidez, anamnese.mes_gravidez, anamnese.uso_medicacao, anamnese.descricao_medicacoes, anamnese.nome_medico_assistente, anamnese.telefone_medico_assistente, anamnese.alergia, anamnese.descricao_alergia, anamnese.fuma, anamnese.bebe, anamnese.pratica_exercicio, anamnese.ja_foi_operado, anamnese.descricao_operacao, anamnese.problema_anestesia, anamnese.problema_hemorragia, anamnese.doenca_reumatica, anamnese.problema_cardiaco, anamnese.problema_renal, anamnese.problema_gastrico, anamnese.problema_alergico, anamnese.problemas_articulares_reumatismo, anamnese.diabetes, anamnese.hipertensao, anamnese.outra, anamnese.descricao_outra, anamnese.problema_cicatrizacao, anamnese.tratamento_medico, anamnese.historico_familiar_doenca, anamnese.descricao_historico_familiar_doenca])
  }

  deletePaciente(id_paciente: number) {

    return db.none('DELETE FROM odonto.paciente WHERE id_paciente = $1', [id_paciente]);
  }
}
