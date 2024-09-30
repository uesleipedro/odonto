import 'dotenv/config'
import { app } from './app'

const port = (process.env.PORT)

const server =
  app.listen(port, () => console.log(`running on port ${port} - ${process.env.HOST} - ${process.env.DATABASE_NAME}`))

process.on('SIGINT', () => {
  server.close()
  console.log('Connection closed')
})
