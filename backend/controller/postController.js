import { ObjectId, Timestamp } from "mongodb"
import { getDb } from "../util/db.js"
import { verifyToken } from "../util/token.js"

const COL = 'posts'

export const newPost = async (req, res) => {
    const token = req.cookies.token
    try {
        const db = await getDb()
        const verify = verifyToken(token)
        const dbUser = await db.collection('users').find({ _id: new ObjectId(verify.userid) })
        if (!dbUser) return res.status(400).end()
        const post = {
            user: {
                _id: req.body._id,
                username: req.body.username,
                occupation: req.body.occupation,
                image: req.body.image
            },
            image: {
                url: req.body.image,
                public_id: req.body.public_id
            },
            content: req.body.content,
            tags: req.body.tags, // Funktionalität kommt erst später
            createdAt: new Timestamp(),
            updatedAt: new Timestamp() // wird mit jedem folgenden Update wieder mit new Timestamp() geupdated
        }
        const result = await db.collection(COL).insertOne(post)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).end()
    }
}

export const getAllPosts = async (req, res) => {
    console.log('get all posts')
    try {
        const db = await getDb()
        const posts = await db.collection(COL).find().toArray()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).end(error.message)
    }
}

export const getUserPosts = async (req, res) => {
    console.log('get user posts')
    const params = req.params
    const userid = params.user
    try {
        const db = await getDb()
        const posts = await db.collection(COL).find({ 'user._id': new ObjectId(userid) }).toArray()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).end(error.message)
    }
}