import db from '../infra/database'

export class AnamneseData {
  getAnamneses() {
    return db.query('SELECT * FROM odonto.anamnese')
  }

  getAnamneseById(id_anamnese: number) {

    return db.oneOrNone('SELECT * FROM odonto.anamnese WHERE id_anamnese = $1', [id_anamnese])
  }

  getAnamneseByPaciente(id_paciente: number) {

    return db.oneOrNone('SELECT * FROM odonto.anamnese WHERE id_paciente = $1 AND id_anamnese = 10', [id_paciente])
  }



  saveAnamnese(anamnese: any) {

    return db.one('INSERT INTO odonto.anamnese (id_paciente, doenca, descricao_doenca, tratamento_medico, gravidez, mes_gravidez, uso_medicacao, descricao_medicacoes, nome_medico_assistente, telefone_medico_assistente, alergia, descricao_alergia, fuma, bebe, pratica_exercicio, ja_foi_operado, descricao_operacao, problema_cicatrizacao, problema_anestesia, problema_hemorragia, doenca_reumatica, problema_cardiaco, problema_renal, problema_gastrico, problema_alergico, problemas_articulares_reumatismo, diabetes, hipertensao, outra, descricao_outra, historico_familiar_doenca, descricao_historico_familiar_doenca ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32) returning *',
      [anamnese.id_paciente, anamnese.doenca, anamnese.descricao_doenca, anamnese.tratamento_medico, anamnese.gravidez, anamnese.mes_gravidez, anamnese.uso_medicacao, anamnese.descricao_medicacoes, anamnese.nome_medico_assistente, anamnese.telefone_medico_assistente, anamnese.alergia, anamnese.descricao_alergia, anamnese.fuma, anamnese.bebe, anamnese.pratica_exercicio, anamnese.ja_foi_operado, anamnese.descricao_operacao, anamnese.problema_cicatrizacao, anamnese.problema_anestesia, anamnese.problema_hemorragia, anamnese.doenca_reumatica, anamnese.problema_cardiaco, anamnese.problema_renal, anamnese.problema_gastrico, anamnese.problema_alergico, anamnese.problemas_articulares_reumatismo, anamnese.diabetes, anamnese.hipertensao, anamnese.outra, anamnese.descricao_outra, anamnese.historico_familiar_doenca, anamnese.descricao_historico_familiar_doenca]);
  }

 

	// "": "asdf",
	// "": true,
	// "descricao_alergia": "asdf",
	// "fuma": true,
	// "bebe": true,
	// "pratica_exercicio": true,
	// "ja_foi_operado": true,
	// "descricao_operacao": "asdfdasf",
	// "problema_anestesia": true,
	// "problema_hemorragia": true,
	// "doenca_reumatica": true,
	// "problema_cardiaco": true,
	// "problema_renal": true,
	// "problema_gastrico": true,
	// "problema_alergico": true,
	// "problemas_articulares_reumatismo": true,
	// "diabetes": true,
	// "hipertensao": true,
	// "outra": true,
	// "descricao_outra": "asdf",
	// "problema_cicatrizacao": true,
	// "tratamento_medico": true,
	// "historico_familiar_doenca": true,
	// "descricao_historico_familiar_doenca": "asdfsaf"

  async updateAnamnese(anamnese: any) {
    // return db.none('UPDATE odonto.anamnese SET id_paciente = $2, doenca = $3, descricao_doenca = $4, gravidez = $5, mes_gravidez = $6, uso_medicacao = $7, descricao_medicacoes = $8, nome_medico_assistente = $9, telefone_medico_assistente = $10, alergia = $11  WHERE id_procedimento = $1',
    //     [procedimento.id_procedimento, procedimento.dente, procedimento.face_dente, procedimento.estado, procedimento.observacao, procedimento.id_profissional, procedimento.adicionado, procedimento.preco, procedimento.id_procedimento_list])
}

  deletePaciente(id_paciente: number) {

    return db.none('DELETE FROM odonto.paciente WHERE id_paciente = $1', [id_paciente]);
  }
}
