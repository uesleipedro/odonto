import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import send from '../services/nodemailer'

export class EmailController {

  
  async sendEmail(dados: any) {
    const html = `
      <hr />
      <p style="text-align:center">&nbsp;</p>
      <p style="text-align:center"><span style="font-family:trebuchet ms,helvetica,sans-serif"><span style="color:#cc33cc"><span style="font-size:20px"><strong>ODONTIC</strong></span></span></span></p>
      <p><span style="font-family:trebuchet ms,helvetica,sans-serif">Ol&aacute;, tudo bem?</span></p>
      <p><span style="font-family:trebuchet ms,helvetica,sans-serif">Recebemos sua solicita&ccedil;&atilde;o para redefinir a sua senha na ODONTIC!</span></p>
      <p><span style="font-family:trebuchet ms,helvetica,sans-serif">Utilize o token abaixo para continuar com a recuperação.</span></p>
      <p><span style="font-size:20px"><strong>${dados?.token}</strong></span></p>
      <p><span style="font-family:trebuchet ms,helvetica,sans-serif">Caso tenha alguma d&uacute;vida, entre em contato com nosso atendimento.</span></p>
      <p>&nbsp;</p>
      <p><span style="font-family:trebuchet ms,helvetica,sans-serif">Estes s&atilde;o os nossos canais oficiais:</span></p>
      <p><span style="font-family:trebuchet ms,helvetica,sans-serif">WhatsApp:&nbsp;(61) 9 9999-9999&nbsp;-&nbsp;<em>N&atilde;o recebe liga&ccedil;&otilde;es</em><br />
      E-mail:&nbsp;atendimento@odontic.com.br</span></p>

      <hr />`
    const { to, subject, body } = dados
  
    send(to, subject, html)

    return "Email enviado com sucesso"
  }


} 
