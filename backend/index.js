import './config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import multer from 'multer'
import { getAllUsers, getOneUser, login, register, updateUser } from './controller/userController.js'
import { encryptFunktion } from './middleware/encrypt.js'
import cookieParser from 'cookie-parser'
import { getAllPosts, getSinglePost, getUserPosts, newComment, newPost } from './controller/postController.js'
import { verifyToken } from './util/token.js'

// Falls ihr multer oder den express validator nutzt, importiert diese einfach auch
const PORT = process.env.PORT
const app = express()

const formReader = multer()

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

//Route zum Token verifizieren
app.get('/api/token', verifyToken)

//User neu registrieren
app.post('/api/register', encryptFunktion, register)

//Alle Users für die Suchfunktion
app.get('/api/users', getAllUsers)

// Find einen User
app.get('/api/user', getOneUser)

// Update einen User
app.put('/api/user', formReader.none(), updateUser)

//Routen zum Token verifizieren
app.get('/api/token', verifyToken)

// POST im Einzeln 
// Erstelle einen neuen Post
app.post('/api/:user/post', formReader.none(), newPost)
// get einen einzelnen Post
app.get('/api/posts/:id', getSinglePost)
// bearbeite einen einzelnen Post
app.put('/api/:user/posts/:id')

// POSTS - Sammlung 
// get alle Posts von einem User
app.get('/api/:user/posts', getUserPosts)
// get alle Posts von allen Usern
app.get('/api/posts', getAllPosts)

// KOMMENTARE
app.put('/api/:user/post', newComment)


// dann werfen wir den Server mal an
app.listen(PORT, () => console.log('Server runs on Port:', PORT))