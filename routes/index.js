var express = require('express');
var router = express.Router();
var register = require('../Models/register')
const storage = require('node-persist');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', async function (req, res, next) {
  console.log(req.body);
  try {
    data = await register.create(req.body)
    res.status(201).json({
      status: "success",
      data
    })
  }
  catch (error) {
    console.log(error);
  }
});

router.get('/getdata', async function (req, res, next) {
  try {
    data = await register.find()
    res.status(201).json({
      status: "success",
      data
    })
  }
  catch (error) {
    console.log(error);
  }
});


router.post('/login', async function (req, res, next) {
  var email_log = req.body.email
  var password = req.body.password
  try {
    data = await register.find({ email: email_log })
    var [data] = data
    console.log(data, 'data');

    if (email_log == data.email) {
      if (password == data.password) {
        await storage.init()
        await storage.setItem('email', data.email)
        res.status(201).json({
          status: "successfully login ",
        })
      }
      else {
        res.status(401).json({
          status: "error"
        })
      }
    }
    else {
      res.status(400).json({
        status: "error"
      })
    }
  }
  catch (error) {
    console.log(error);
  }
});




module.exports = router;
