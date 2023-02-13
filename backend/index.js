import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { getAllUsers, login, register } from './controller/userController.js'
import { encryptFunktion } from './middleware/encrypt.js'
import cookieParser from 'cookie-parser'

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

// hier ist unsere default Route fürs Backend, wir sehen das wenn wir erfolgreich das Backend deployed haben
app.get('/', (req, res) => {
    res.status(200).send('Alles OKAY')
})

//USER
//Einloggen
app.post('/api/login', encryptFunktion, login)

//User neu registrieren
app.post('/api/register', encryptFunktion, register)

//Alle Users für die Suchfunktion
app.get('/api/users', getAllUsers)

//Routen zum Token verifizieren

// POST im Einzeln 
// Erstelle einen neuen Post
app.post('/api/:user/post')
// get einen einzelnen Post
app.get('/api/:user/posts/:id')
// bearbeite einen einzelnen Post
app.put('/api/:user/posts/:id')

// POSTS - Sammlung 
// get alle Posts von einem User
app.get('/api/:user/posts')
// get alle Posts von allen Usern
app.get('/api/posts')


// dann werfen wir den Server mal an
app.listen(PORT, () => console.log('Server runs on Port:', PORT))