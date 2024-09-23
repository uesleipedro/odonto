import express, { Request, Response, NextFunction } from "express"
import userRoute from "./routes/userRoute"
import empresaRoute from "./routes/empresaRoute"
import agendaRoute from "./routes/agendaRoute"
import procedimentoRoute from "./routes/procedimentoRoute"
import pacienteRoute from "./routes/pacienteRoute"
import procedimentoListRoute from "./routes/procedimentoListRoute"
import dentesRoute from "./routes/dentesRoute"
import faceDenteRoute from "./routes/faceDenteRoute"
import anamneseRoute from "./routes/anamneseRoute"
import orcamentoRoute from "./routes/orcamentoRoute"
import pagamentoRoute from "./routes/pagamentoRoute"
import procedimentoOrcamentoRoute from "./routes/procedimentoOrcamentoRoute"
import contasReceberRoute from "./routes/contasReceberRoute"
import emailRoute from "./routes/emailRoute"
import accessLevelRoute from "./routes/accessLevelRoute"
import wppSession from "./routes/wppSessionRoute"
import screenRoute from "./routes/screenRoute"
import accessLevelScreenRoute from "./routes/accessLevelScreenRoute"
import evolucaoRoute from "./routes/evolucaoRoute"
import efiRoute from "./routes/efiRoute"
import efiCredentialRoute from "./routes/efiCredentialRoute"
import formaPagamentoRoute from "./routes/formaPagamentoRoute"
import { Middleware } from "./middlewares/middleware"
import cors from 'cors'

const middleware = new Middleware()
export const app = express()

const options: cors.CorsOptions = {
  origin: '*'
}

app.use(cors(options))
app.use(express.json())

app.use("/user", userRoute)
app.use("/empresa", middleware.verificarToken, empresaRoute)
app.use("/agenda", middleware.verificarToken, agendaRoute)
app.use("/paciente", middleware.verificarToken, pacienteRoute)
app.use("/procedimento", middleware.verificarToken, procedimentoRoute)
app.use("/procedimento_list", middleware.verificarToken, procedimentoListRoute)
app.use("/dentes", middleware.verificarToken, dentesRoute)
app.use("/faceDente", middleware.verificarToken, faceDenteRoute)
app.use("/anamnese", middleware.verificarToken, anamneseRoute)
app.use("/orcamento", middleware.verificarToken, orcamentoRoute)
app.use("/pagamento", middleware.verificarToken, pagamentoRoute)
app.use("/procedimento_orcamento", middleware.verificarToken, procedimentoOrcamentoRoute)
app.use("/contas_receber", middleware.verificarToken, contasReceberRoute)
app.use("/sendEmail", middleware.verificarToken, emailRoute)
app.use("/access_level", middleware.verificarToken, accessLevelRoute)
app.use("/access_level_screen", middleware.verificarToken, accessLevelScreenRoute)
app.use("/wpp-session", middleware.verificarToken, wppSession)
app.use("/screens", middleware.verificarToken, screenRoute)
app.use("/evolucao", middleware.verificarToken, evolucaoRoute)
app.use("/efi", middleware.verificarToken, efiRoute)
app.use("/efiCredential", middleware.verificarToken, efiCredentialRoute)
app.use("/formaPagamento", middleware.verificarToken, formaPagamentoRoute)
