import crypto from 'crypto'

const algorithm = 'aes-256-cbc' // Algoritmo de criptografia (CBC)
//const key = crypto.randomBytes(32) // Chave de 32 bytes (256 bits)
const key = "11111111111111111111111111111111"

// Função para criptografar
export function encrypt(text: any) {
  const iv = crypto.randomBytes(16) // Gerar um novo IV
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  let encrypted = cipher.update(text, 'utf8', 'base64')
  encrypted += cipher.final('base64')

  return {
    iv: iv.toString('base64'), // Converter IV para Base64
    encryptedData: encrypted    // Dados criptografados em Base64
  }
}

// Função para descriptografar
export function decrypt(encryptedText: any) {
  const ivBuffer = Buffer.from(encryptedText.iv, 'base64') // Converter IV de volta para Buffer
  const encryptedBuffer: any = Buffer.from(encryptedText.encryptedData, 'base64') // Converter texto criptografado para Buffer

  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer)

  let decrypted = decipher.update(encryptedBuffer, 'base64', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

