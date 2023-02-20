import { ObjectId } from "mongodb"
import { getDb } from "../util/db.js"
import { verifyToken } from "../util/token.js"

const COL = 'comments'

export const newComment = async (comment) => {
    // console.log(comment)
    try {
        const db = await getDb()
        const result = await db.collection(COL).insertOne(comment)
    } catch (error) {
        console.log(error.message)
    }
}

export const getSingleComment = async (req, res) => {
    // console.log(req.params.id)
    try {
        const db = await getDb()
        const result = await db.collection(COL).find({ _id: new ObjectId(req.params.id) }).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(400).end(error.message)
    }
}

export const saveCommentToPost = async (req, res) => {
    // console.log('new comment')
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
            _id: new ObjectId,
            user: {
                _id: new ObjectId(req.body._id),
                username: req.body.username,
                occupation: req.body.occupation,
                image: req.body.image
            },
            content: req.body.content,
            createdAt: new Date(),
            likedBy: []
        }

        const result = await db.collection("posts").updateOne({ _id: new ObjectId(req.body.postID) }, { $addToSet: { comments: comment } })
        newComment(comment)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).end(error.message)
    }
}

export const likeSingleComment = async (req, res) => {
    // console.log('like single comment')
    // console.log(req.body)
    const commentid = req.body.commentId
    try {
        if (req.body.result === true) {
            console.log('true')
            try {
                const db = await getDb()
                const commentLiked = await db.collection(COL).updateOne({ _id: new ObjectId(commentid) }, { $addToSet: { likedBy: req.body.likedBy } })
                res.status(200).json(commentLiked)
            } catch (error) {
                console.log(error.message)
                res.status(400).end(error.message)
            }
        }
        if (req.body.result === false) {
            console.log('false')
            try {
                const db = await getDb()
                const commentLiked = await db.collection(COL).updateOne({ _id: new ObjectId(commentid) }, { $pull: { likedBy: req.body.likedBy } })
                res.status(200).json(commentLiked)
            } catch (error) {
                res.status(400).end(error.message)
            }
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(400).end()
    }

}