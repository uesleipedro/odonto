import { AgendaData } from '../data/agendaData'

const agendaData = new AgendaData()
const cores = [
  "#3357FF",  // Azul
  "#33FF9E",  // Verde Claro
  "#FF5733",  // Vermelho
  "#F0FF33",  // Amarelo
  "#9933FF",  // Roxo
  "#FF33E6",  // Rosa
  "#33FFF0",  // Ciano
  "#FFA533",  // Laranja
  "#33FF57",  // Verde
  "#FF3333",  // Vermelho Escuro
  "#33FFB2",  // Turquesa
  "#3357FF",  // Azul Royal
  "#FF5733",  // Laranja Forte
  "#FF33A5",  // Rosa Forte
  "#FFFB33",  // Amarelo Brilhante
  "#333EFF",  // Azul Elétrico
  "#A533FF",  // Violeta
  "#FF6D33",  // Coral
  "#33FF6D",  // Verde Neon
  "#FF33B8"   // Magenta
]

export class AgendaController {

  associarCoresAgendamentos(agendamentos: any) {
    return agendamentos.map((agendamento: any, index: any) => {
      const color = cores[index % cores.length]
      return {
        color: color,
        ...agendamento
      }
    })
  }

  async getAgenda(id_empresa: number) {

    let agendamento: any = await agendaData.getAgendaTeste(id_empresa)
    return await this.associarCoresAgendamentos(agendamento)
  }

  async saveAgenda(agenda: any) {
    let existingAgenda
    try {

      const a = await agendaData.saveAgenda(agenda)
      if (!a) throw new Error("Erro aqui")

    } catch (e) {
      //throw new Error ()
      console.error(e)
    }

  };

  async updateAgenda(agenda: any) {
    try {
      await agendaData.updateAgenda(agenda)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async updateDataHora(agenda: any) {
    try {
      await agendaData.updateDataHora(agenda)
    } catch (e) {
      console.error(e)
      throw new Error()
    }

  }

  async deleteAgenda(agenda: any) {

    return await agendaData.deleteAgenda(agenda)
  }
}
