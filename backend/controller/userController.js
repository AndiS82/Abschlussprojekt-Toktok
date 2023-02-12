import { getDb } from "../util/db.js";
import { createToken } from "../util/token.js";

export const login = (req, res) => {
    console.log("userController.js console log", req.body)
    getDb()
        //1. Abfragen, ob ein entsprechender User existiert
        .then((db) => db.collection("users").findOne({ "user": req.body.user }))
        .then(user => {
            if (user === null) {
                //falls nein:
                console.log('user not found')
                res.status(400).end()
            }
            //wenn ja, das Passwort dazu prüfen:
            else {
                console.log('user', user)
                console.log('req', req.body.password)
                if (user.password === req.body.password) {
                    const token = createToken(user._id)
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
        const result = await db.collection("users").insertOne(user)
        console.log("register Funktion result = ", result)
        res.status(200).end()
    }
    catch (error) {
        console.log(error.message)
        res.status(403).end()
    }
}