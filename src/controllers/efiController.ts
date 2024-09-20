import EfiPay from 'sdk-node-apis-efi'
import { ContasReceberData } from '../data/contasReceberData'
import { EfiCredentialController } from '../controllers/efiCredentialController'

const contasReceberData = new ContasReceberData()
const efiCredentialController = new EfiCredentialController()

export class EfiController {

  async genEfiPay(id_empresa: number) {
    const credentialData = await efiCredentialController.getEfiCredential(id_empresa)
    return new EfiPay({
      client_id: credentialData[0].client_id,
      client_secret: credentialData[0].client_secret,
      sandbox: true
    })
  }

  async createBoleto(dados: any) {

    const efipay = await this.genEfiPay(dados.dadosPagamento.id_empresa)

    return await efipay.createOneStepCharge({}, dados.dadosBoleto)
      .then(async (resposta) => {
        if (resposta.code !== 200)
          return

        await contasReceberData.updateDadosBoleto(dados.dadosPagamento, resposta.data)

        return resposta
      })
      .catch((error: any) => {
        console.error(error)
      })

  }
  async listaBoletos(id_empresa: number) {
    const efipay = await this.genEfiPay(id_empresa)

    try {
      const params: {
        begin_date: string;
        end_date: string;
        charge_type: 'billet' | 'card' | 'carnet' | 'subscription';
      } = {
        // Adicione parâmetros para paginação e outros filtros se necessário
        begin_date: '2024-01-01',
        end_date: '2024-12-31',
        charge_type: "billet"
      }

      const response = await efipay.listCharges(params)
      return response
    } catch (error: any) {
      console.error('Erro ao consultar boletos:', error.response ? error.response.data : error.message);
    }
  }

  async cancelaBoleto(dados: any) {
    const efipay = await this.genEfiPay(Number(dados.id_empresa))
    const response = await efipay.cancelCharge({ id: Number(dados.id) })
    return response
  }
}
