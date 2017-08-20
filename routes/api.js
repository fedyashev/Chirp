var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    if (req.method === "GET") {
        return next();
    }
    if (!req.isAuthenticated()) {
        return res.redirect("/#login");
    }
    return next();
});

router.route("/posts")
    
    // return all posts
    .get(function(req, res) {

        // temporary solution
        res.send({message: "TODO return all posts."});
    })

    // post
    .post(function(req, res) {

        // temporary solution
        res.send({message: "TODO Create a new post."});
    });

router.route("/posts/:id")

    // returns a particular post
    .get(function(req, res) {

        // temporary solution
        res.send({message: "TODO return post with ID " + req.params.id});
    })

    // update existing post
    .put(function(req, res) {

        // temporary solution
        res.send({message: "TODO modify post with ID " + req.params.id});
    })

    // delete existing post
    .delete(function(req, res) {

        // temporary solution
        res.send({message: "TODO delete post with ID " + req.params.id});
    })    

module.exports = router;