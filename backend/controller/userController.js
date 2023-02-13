import { ObjectId } from "mongodb";
import { getDb } from "../util/db.js";
import { createToken, verifyToken } from "../util/token.js";

const COL = 'users'
const cookieConfig = {
    httpOnly: true,
    sameSite: 'none',
    secure: true
}

export const login = (req, res) => {
    console.log("userController.js console log", req.body)
    getDb()
        //1. Abfragen, ob ein entsprechender User existiert
        .then((db) => db.collection(COL).findOne({ "user": req.body.user }))
        .then(user => {
            if (user === null) {
                //falls nein:
                console.log('user not found')
                res.status(401).end()
            }
            //wenn ja, das Passwort dazu prüfen:
            else {
                console.log('user', user)
                console.log('req', req.body.password)
                if (user.password === req.body.password) {
                    const token = createToken(user._id)
                    res.cookie('token', token, cookieConfig)
                    res.json({ token }).end()
                }
                else {
                    //wenn das Passwort falsch ist:
                    console.log('password ist falsch')
                    res.status(401).end()
                }
            }
        })
}

export const register = async (req, res) => {
    const user = req.body
    try {
        const db = await getDb()
        const result = await db.collection(COL).insertOne(user)
        console.log("register Funktion result = ", result)
        res.status(200).end()
    }
    catch (error) {
        console.log(error.message)
        res.status(400).end()
    }
}

export const getAllUsers = async (req, res) => {
    console.log('get all users')
    const db = await getDb()
    try {
        const allUsers = await db.collection(COL).find().toArray()
        console.log(`allUsers = `, allUsers)
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error.message)
        res.status(400).end()
    }
}

export const getOneUser = async (req, res) => {
    const token = req.cookies.token
    const db = await getDb()
    try {
        const verify = verifyToken(token)
        const dbUser = await db.collection(COL).findOne({ _id: new ObjectId(verify.userid) })
        res.status(200).json(dbUser)
    } catch (error) {
        res.status(401).end()
    }
}