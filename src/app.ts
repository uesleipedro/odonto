import express, { Request, Response, NextFunction } from 'express';
import userRoute from './routes/userRoute'
import { UserController } from './controllers/userController'
import empresaRoute from './routes/empresaRoute'
import agendaRoute from './routes/agendaRoute'
import pacienteRoute from './routes/pacienteRoute'
const cors = require('cors')

export const app = express()
const userController = new UserController

app.use(express.json())
app.use(cors());

app.use('/user', userRoute)
app.use('/empresa', empresaRoute)
app.use('/agenda', agendaRoute)
app.use('/paciente', pacienteRoute)