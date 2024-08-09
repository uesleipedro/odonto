import nodemailer from "nodemailer"
import 'dotenv/config'

interface TransportOptions {
  host: any;
  port: any;
  secure: any;
  auth: {
    user: any;
    pass: any;
  };
}

const createTransporter = (options: TransportOptions) => {
  return nodemailer.createTransport(options)
}

const transporter = createTransporter({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const send = (to: string, subject: string, body: string) => {
  transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text: body
  })
}

export default send
