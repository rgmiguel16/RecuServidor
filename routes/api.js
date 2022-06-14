var express = require('express');
var router = express.Router();
const axios = require('axios');
const pool = require('../database');

/* GET api propia */
router.get('/listar', async(req, res, next)=> {
    const myapi = await pool.query('SELECT * FROM coches');
    res.json(myapi);
});

module.exports = router;
