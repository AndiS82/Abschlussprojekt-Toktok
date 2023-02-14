import jwt from 'jsonwebtoken'

export function createToken(userId) {
    return jwt.sign({ userid: userId }, process.env.JWT_SECRET, { expiresIn: '30min' })
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}