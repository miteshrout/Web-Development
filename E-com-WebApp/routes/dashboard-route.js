var express = require('express');
var router = express.Router();
var db=require('../database');
/* GET users listing. */
router.get('/dashboard', function (req, res, next) {
    if (req.session.loggedinUser) {
        res.render('dashboard', { email: req.session.email, fullName: req.session.fullName, loggedinUser:req.session.loggedinUser })
        // console.log(req.session.email);

    } else {
        res.redirect('/login');
    }
});

module.exports = router;

