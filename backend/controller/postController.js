import { ObjectId, Timestamp } from "mongodb"
import { getDb } from "../util/db.js"
import { verifyToken } from "../util/token.js"
import { updateUserPostsCount } from "./userController.js"

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
                _id: new ObjectId(req.body._id),
                username: req.body.username,
                occupation: req.body.occupation,
                image: req.body.userimage
            },
            image: {
                url: req.body.image,
                public_id: req.body.public_id
            },
            location: {
                city: req.body.city,
                country: req.body.country
            },
            content: req.body.content,
            tags: req.body.tags, // Funktionalität kommt erst später
            createdAt: new Timestamp(),
            updatedAt: new Timestamp() // wird mit jedem folgenden Update wieder mit new Timestamp() geupdated
        }
        const result = await db.collection(COL).insertOne(post)
        updateUserPostsCount(token)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).end()
    }
}

export const newComment = async (req, res) => {
    console.log('new comment')
    const token = req.cookies.token
    console.log(req.body)
    try {
        const db = await getDb()
        const verify = verifyToken(token)
        const dbUser = await db.collection('users').find({ _id: new ObjectId(verify.userid) })
        console.log(`dbUser`)
        if (!dbUser) return res.status(401).end('user not verified')
        console.log(req.body.postID)
        const comment = {
            user: {
                _id: new ObjectId(req.body._id),
                username: req.body.username,
                occupation: req.body.occupation,
                image: req.body.image
            },
            content: req.body.content,
            likes: req.body.likes, // Funktionalität kommt erst später
            createdAt: new Timestamp(),
        }

        const result = await db.collection(COL).updateOne({ _id: new ObjectId(req.body.postID) }, { $addToSet: { comments: comment } })
        res.status(200).json(result)
    } catch (error) {
        res.status(400).end(error.message)
    }
}

// Function, um einen Kommentar löschen zu können
// Function, um einen Post löschen zu können
// Function, um die Likes eines Posts dynamisch ändern zu können
// Function, um die Likes eines Comments dynamisch ändern zu können

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

export const getSinglePost = async (req, res) => {
    console.log('get single post')
    const params = req.params
    const postid = params.id
    try {
        const db = await getDb()
        const post = await db.collection(COL).findOne({ _id: new ObjectId(postid) })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).end(error.message)
    }
}