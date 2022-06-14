var express = require('express');
const pool = require('../database');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET api */
router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Signup */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', {title: 'Express'})
});

/* POST Signup */
router.post('/signup', async(req, res, next)=> {
  const {fullname, username, password} = req.body;
  const user = {
    fullname,
    username,
    password
  };
  await pool.query('INSERT INTO users set ?', [user]);
  res.redirect('/');
});

/* GET Signin */
router.get('/signin', function(req, res, next) {
  res.render('auth/signin', { title: 'Express' });
});

/* POST Signin */
router.post('/signin', async(req, res, next)=>{
  const {username, password} = req.body;
  const users = await pool.query('SELECT id, username, password FROM users WHERE username =? AND password =?', [username, password]);
  if (users.length > 0) {
    req.session.user = {
      id: users[0].id,
      username: users[0].username
    };
    res.redirect('/links/lista')
  } else{
    delete req.session.user;
    res.redirect('/signin');
  };
});

/* GET Logout */
router.get('/logout', function(req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;

