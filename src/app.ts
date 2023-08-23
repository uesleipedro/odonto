import express, { Request, Response, NextFunction } from 'express';
import usuarioRoute from './routes/usuarioRoute'

export const app = express();

app.use(express.json());

app.use('/usuario', usuarioRoute);
