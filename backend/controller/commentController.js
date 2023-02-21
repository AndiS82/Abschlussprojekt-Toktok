import { ObjectId } from "mongodb"
import { getDb } from "../util/db.js"
import { verifyToken } from "../util/token.js"

const COL = 'comments'

export const getPostComments = async (req, res) => {
    // console.log(req.params.id)
    try {
        const db = await getDb()
        const result = await db.collection(COL).find({ post: req.params.id }).toArray()
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(400).end(error.message)
    }
}

export const getSingleComment = async (req, res) => {
    console.log('params for single comment', req.params)
    try {
        const db = await getDb()
        const result = await db.collection(COL).findOne({ _id: req.params.id })
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(400).end()
    }
}

export const saveCommentToPost = async (req, res) => {
    // console.log('new comment')
    const token = req.cookies.token
    // console.log('userid', req.body.userid)
    const db = await getDb()
    const verify = verifyToken(token)
    const dbUser = await db.collection('users').find({ _id: new ObjectId(verify.userid) })
    if (!dbUser) return res.status(401).end('user not verified')
    try {
        const comment = {
            _id: new ObjectId,
            user: req.body.userid,
            post: req.body.postID,
            content: req.body.content,
            createdAt: new Date(),
            updatedAt: new Date(),
            likedBy: []
        }
        // console.log('comment', comment)
        const result = await db.collection(COL).insertOne(comment)
        // console.log('commentid', comment._id)
        try {
            const userResult = await db.collection('posts').updateOne({ _id: new ObjectId(req.body.postID) }, { $addToSet: { comments: comment._id } })
            res.status(200).json(userResult)
        } catch (error) {
            console.log(error.message)
            res.status(400).end()
        }
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