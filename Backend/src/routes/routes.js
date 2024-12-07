const { Router } = require('express')
const path = require('path')
const { handleGetPost, handleCreatePost, handleDeletePost, handleUpdatePost } = require('../controllers/users.controller')

const router = Router()

router.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname + '/.../index.html'));
})

router.get('/posts', handleGetPost)

router.post('/posts', handleCreatePost)

//router.delete('/posts/:id', handleDeletePost)

router.patch('/posts/:id', handleUpdatePost)


module.exports = router