import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { login, register } from './controller/userController.js'
import { encryptFunktion } from './middleware/encrypt.js'
import cookieParser from 'cookie-parser'
import { verifyToken } from "./util/token.js";

// Falls ihr multer oder den express validator nutzt, importiert diese einfach auch
const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())

// hier ist genung Platz für alle eure Routen
app.get('/', (req, res) => {
    res.status(200).send('Alles OKAY')
})

//Einloggen
app.post('/api/login', encryptFunktion, login)

//Route zum Token verifizieren
app.get('/api/token', verifyToken)

//User neu registrieren
app.post('/api/register', encryptFunktion, register)

//Routen zum Token verifizieren



// dann werfen wir den Server mal an
app.listen(PORT, () => console.log('Server runs on Port:', PORT))