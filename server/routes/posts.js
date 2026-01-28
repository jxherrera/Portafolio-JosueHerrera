const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); 
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del Servidor');
    }
});

router.post('/', auth, async (req, res) => {
    const { title, content, category } = req.body;
    try {
        const newPost = new Post({
            title,
            content,
            category
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del Servidor');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post no encontrado' });

        await Post.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Post eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del Servidor');
    }
});

module.exports = router;