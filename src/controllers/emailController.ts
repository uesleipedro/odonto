//import { EmailData } from '../data/emailData'
import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'

//const emailData = new EmailData()

export class EmailController {
  
  async sendEmail(dados: any) {
    

// Configuração do transportador (transporter)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use o serviço de email desejado, por exemplo, 'gmail'
  auth: {
    user: 'ueslei.pedro.rangel@gmail.com', // Seu email
    pass: '3M3nW@lk0nTh3m00n', // Sua senha ou um App Password gerado (recomendado para Gmail)
  },
});

// Opções do email
const mailOptions = {
  from: 'ueslei.pedro.rangel@gmail.com', // Email de origem
  to: 'ielseu@hotmail.com', // Email de destino
  subject: 'Email Teste',
  text: 'Teste de envio de email',
  // html: '<p>Corpo do email em <strong>HTML</strong></p>', // Opcional: Corpo do email em HTML
};

// Enviar o email
transporter.sendMail(mailOptions, (error: any, info: any) => {
  if (error) {
    console.log('Erro ao enviar o email:', error);
  } else {
    console.log('Email enviado:', info.response);
  }

  return info.response
})
  }


} 
