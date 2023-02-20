import { ObjectId } from "mongodb"
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
            likedBy: [],
            tags: req.body.tags, // Funktionalität kommt erst später
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const result = await db.collection(COL).insertOne(post)
        try {
            updateUserPostsCount(token)
            console.log('user post count geupdated')
        }
        catch (error) {
            console.log('user post count nicht geupdated')
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(400).end(error.message)
    }
}

// Function, um einen Kommentar löschen zu können
// Function, um einen Post löschen zu können

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

export const likeSinglePost = async (req, res) => {
    console.log('like single post')
    const params = req.params
    const postid = params.id
    console.log(postid, req.body)
    if (req.body.result === true) {
        try {
            const db = await getDb()
            const postLiked = await db.collection(COL).updateOne({ _id: new ObjectId(postid) }, { $addToSet: { likedBy: req.body.likedBy } })
            res.status(200).json(postLiked)
        } catch (error) {
            res.status(400).end(error.message)
        }
    }
    if (req.body.result === false) {
        try {
            const db = await getDb()
            const postLiked = await db.collection(COL).updateOne({ _id: new ObjectId(postid) }, { $pull: { likedBy: req.body.likedBy } })
            res.status(200).json(postLiked)
        } catch (error) {
            res.status(400).end(error.message)
        }
    }
    res.status(200).end()
}