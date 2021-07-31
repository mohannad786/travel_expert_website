var express = require('express');
var router = express.Router();
const Post = require('../models/userdata').Post;

 router.get('/', function (req, res, next) {
  
    res.render('contact');
  });

// To create a new database entry
router.post('/', function (req, res, next) {
  // const post = new Post(req.body);
  const post = new Post();
  post.firstname = req.body.firstname
  post.lastname= req.body.lastname
  post.email= req.body.email
  post.comment= req.body.comment
  post.save(err => {
    // if(err) throw err;
    if (err) {
     
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      return res.render("contact", {
        errors: errorArray
      });
    }
    res.redirect("/thankyou");
  });
});

// Shows a single post
router.get('/:email1', function (req, res, next) {
  const data = req.params.email1;
  Post.findOne({ email: data }, (err, post) => {
   res.render('user-data', { userdat:post });
    console.log(post.comment);
    //console.log(userdat);
  });
});

module.exports = router;