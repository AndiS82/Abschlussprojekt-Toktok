import { ObjectId } from "mongodb";
import { deleteImage } from "../services/cloudinary.js";
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
    // console.log(user)
    const completeUser = {
        name: null,
        username: null,
        occupation: null,
        dob: null,
        email: req.body.user,
        password: req.body.password,
        tel: null,
        sex: null,
        website: null,
        aboutMe: null,
        following: null,
        followedBy: null
    }
    try {
        const db = await getDb()
        const result = await db.collection(COL).insertOne(completeUser)
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

export const getUserProfile = async (req, res) => {
    const token = req.cookies.token
    const params = req.params.userid
    const db = await getDb()
    try {
        const verify = verifyToken(token)
        const dbUser = await db.collection(COL).findOne({ _id: new ObjectId(verify.userid) })
        if (!dbUser) return res.status(400).end()
        try {
            const profile = await db.collection(COL).findOne({ _id: new ObjectId(params) })
            res.status(200).json(profile)
        } catch (error) {
            console.log(error.message)
            res.status(400).end()
        }
    } catch (error) {
        res.status(401).end()
    }
}

export const updateUser = async (req, res) => {
    console.log('update user called')
    const token = req.cookies.token
    console.log('body', req.body)
    const db = await getDb()
    if (req.body.old_id) {
        await deleteImage(req.body.old_id)
    }
    try {
        const verify = verifyToken(token)
        console.log('verify', verify)
        const dbUser = await db.collection(COL).updateOne({ _id: new ObjectId(verify.userid) },
            {
                $set: {
                    name: req.body.name,
                    username: req.body.username,
                    occupation: req.body.occupation,
                    dob: req.body.dob,
                    email: req.body.email,
                    tel: req.body.tel,
                    sex: req.body.sex,
                    website: req.body.website,
                    aboutMe: req.body.aboutme
                }
            })
        console.log('dbuser', dbUser)
        if (req.body.image) {
            try {
                const imageUpdate = await db.collection(COL).updateOne({ _id: new ObjectId(verify.userid) }, { $set: { image: { url: req.body.image, public_id: req.body.public_id } } })
                console.log('imageUpdate', imageUpdate)
            }
            catch (error) {
                res.status(400).end(error.message)
            }
        }
        res.status(200).json(dbUser)
    } catch (error) {
        res.status(401).end(error.message)
    }
}

export const updateUserPostsCount = async (token) => {
    console.log('update # posts')
    const db = await getDb()
    try {
        const verify = verifyToken(token)
        const dbUserPosts = await db.collection(COL).updateOne({ _id: new ObjectId(verify.userid) }, { $inc: { numberOfPosts: 1 } })
        console.log(dbUserPosts)
    } catch (error) {
        console.log(error.message)
    }
}

export const logoutUser = async (_, res) => {
    res.cookie('token', '', { ...cookieConfig, maxAge: 0 })
    res.status(204).end();
}

export const followUser = async (req, res) => {
    console.log('follow user')
    const token = req.cookies.token
    const db = await getDb()
    try {
        if (req.body.result === true) { // req.body.result === true, wenn followerUser auf 'follow' des followingUser geklickt hat 
            try {
                const verify = verifyToken(token)
                const followerUser = await db.collection(COL).updateOne({ _id: new ObjectId(verify.userid) },
                    { $addToSet: { following: req.body.following } })
                console.log('follower user', followerUser)
                const followingUser = await db.collection(COL).updateOne({ _id: new ObjectId(req.body.following) }, { $addToSet: { followedBy: req.body._id } })
                console.log('following user', followingUser)
                res.status(200).json({ followerUser, followingUser })
            } catch (error) {
                console.log(error.message)
                res.status(400).end()
            }
        }
        if (req.body.result === false) { // wird false wenn followerUser unfollowed den followingUser 
            try {
                const verify = verifyToken(token)
                const unfollowerUser = await db.collection(COL).updateOne({ _id: new ObjectId(verify.userid) },
                    { $pull: { following: req.body.following } })
                console.log('unfollowerUser', unfollowerUser)
                const unfollowingUser = await db.collection(COL).updateOne({ _id: new ObjectId(req.body.following) }, { $pull: { followedBy: req.body._id } })
                console.log('unfollowing user', unfollowingUser)
                res.status(200).json({ unfollowerUser, unfollowingUser })
            } catch (error) {
                console.log(error.message)
                res.status(400).end()
            }
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(401).end()
    }
}