const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostid = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostid[req.params.id] || [])
})

app.post('/posts/:id/comments', async(req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostid[req.params.id] || [];
    comments.push({ id: commentId, content });

    commentsByPostid[req.params.id] = comments;

    await axios.post('http://localhost:8006/events', {
        type:'CommentCreated',
        data:{
            id: commentId,
            content,
            postId: req.params.id
        }
    })

    res.status(201).send(comments);
})

app.post('/events',(req,res)=>{
    console.log('events received', req.body.type);
    res.send({});
})

app.listen(8001, () => {
    console.log('Server listening on port 8001');
})