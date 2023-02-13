import jwt from 'jsonwebtoken'

export function createToken(userId) {
    const token = jwt.sign({ userid: userId }, process.env.JWT_SECRET, { expiresIn: '30min' })
    console.log('create token', token)
    return token
}

export function verifyToken(token) {
    console.log('verify', token)
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    console.log(verified)
    return verified
}