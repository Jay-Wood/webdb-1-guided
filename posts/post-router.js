const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db("posts")    
        .select("title", "contents")
        .then(posts => {
            res.status(200).json(posts)
        })    
        .catch(err => {
            res.json(err)
        })
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    db("posts")
        .select("title","contents")
        // .where("id", id)
        .where({ id })
        //first() === posts[0] in .then()
        // .first()
        .then(posts => {
            res.status(200).json(posts[0])
        })    
        .catch(err => {
            res.json(err)
        })
});

router.post('/', (req, res) => {
    let postData = req.body;
    //validate data w/ middleware before sending to database

    db("posts")
        .insert(postData, "id") //always add "id" for consistency(can be ignored in sqlite3)
        .then(posts => {
            res.status(200).json(posts)
        })    
        .catch(err => {
            res.json(err)
        })

});

router.put('/:id', (req, res) => {
    const changes = req.body;

    db("posts")
        .where({id: req.params.id})
        .update(changes)
        .then(posts => {
            res.status(200).json(posts)
        })    
        .catch(err => {
            res.json(err)
        })
});

router.delete('/:id', (req, res) => {
    db("posts")
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({message: `${count} posts deleted.`})
        })
        .catch(err => {
            res.json(err)
        })
});

module.exports = router;