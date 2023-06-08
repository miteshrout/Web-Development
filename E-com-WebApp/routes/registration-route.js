var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/registration', function(req, res, next) {
  res.render('registration-form', { title: 'Express' });
});

router.post('/register', function (req, res, next) {

  inputData = {
      fullName: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      gender:req.body.gender,
      password: req.body.password,    
  }

  inputData2={
    confirm_password:req.body.confirm_password
  }
  // check unique email address
  var sql = 'SELECT * FROM registration WHERE email=?';
  db.query(sql, [inputData.email], function (err, data, fields) {
      if (err) throw err
      if (data.length > 0) {
          var msg = inputData.email + " was already exist";
      }
      
      else {

          // save users data into database
          var sql = 'INSERT INTO registration SET ?';
          db.query(sql, inputData, function (err, data) {
              if (err) throw err;
          });
          var msg = "Your are successfully registered";
      }
      res.render('registration-form', { alertMsg: msg });
  })

});

module.exports = router;
