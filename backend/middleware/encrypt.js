import { createHmac } from 'crypto'

export const encryptFunktion = (req, res, next) => {
    console.log("encrypt.js console", req.body)
    const hmac = createHmac('sha256', req.body.password)
    req.body.password = hmac.digest('hex')
    next()
}