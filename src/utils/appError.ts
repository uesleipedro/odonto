class AppError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message) // Chama o construtor da classe Error
    this.status = status // Define o status code
    this.name = this.constructor.name // Define o nome do erro
    Error.captureStackTrace(this, this.constructor) // Captura a stack trace
  }
}

export default AppError
