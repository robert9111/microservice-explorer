const express = require('express')
const app = express();
const { randomBytes } = require('crypto')

const PORT = process.env.PORT || 4001;

const commentsByPostId = {}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content })

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})