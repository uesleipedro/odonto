import express, { Request, Response, NextFunction } from 'express';
import userRoute from './routes/userRoute'
import empresaRoute from './routes/empresaRoute'
export const app = express()

app.use(express.json())

app.use('/user', userRoute)
app.use('/empresa', empresaRoute)
