import express, { Request, Response, NextFunction } from "express"
import userRoute from "./routes/userRoute"
import empresaRoute from "./routes/empresaRoute"
import agendaRoute from "./routes/agendaRoute"
import procedimentoRoute from "./routes/procedimentoRoute"
import pacienteRoute from "./routes/pacienteRoute"
import auth from "./middlewares/validateToken"
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
import cors from 'cors'

export const app = express()

const allowedOrigins = ['*'];
const options: cors.CorsOptions = {
  origin: '*'
};

app.use(cors(options));

app.use(express.json());

app.use("/user", userRoute)
app.use("/empresa", empresaRoute)
app.use("/agenda", agendaRoute)
app.use("/paciente", pacienteRoute)
app.use("/procedimento", procedimentoRoute)
app.use("/procedimento_list", procedimentoListRoute)
app.use("/dentes", dentesRoute)
app.use("/faceDente", faceDenteRoute)
app.use("/anamnese", anamneseRoute)
app.use("/orcamento", orcamentoRoute)
app.use("/pagamento", pagamentoRoute)
app.use("/procedimento_orcamento", procedimentoOrcamentoRoute)
app.use("/contas_receber", contasReceberRoute)
app.use("/sendEmail", emailRoute)
app.use("/access_level", accessLevelRoute)
app.use("/access_level_screen", accessLevelScreenRoute)
app.use("/wpp-session", wppSession)
app.use("/screens", screenRoute)
app.use("/evolucao", evolucaoRoute)
app.use("/efi", efiRoute)
app.use("/efiCredential", efiCredentialRoute)
app.use("/formaPagamento", formaPagamentoRoute)
