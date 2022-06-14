var express = require('express');
var router = express.Router();
const pool = require('../database');


/* GET /lista */
router.get('/lista', async(req, res, next)=> {
    if (typeof req.session.user === 'undefined') {
      console.log('Sesion no iniciada')
      return res.redirect('/signin');
    }
    console.log('Sesion iniciada')
    const coches = await pool.query('SELECT * FROM coches WHERE user_id=?', [req.session.user.id]);
    res.render('links/lista', { title: 'Lista de coches', coches});
});

/* GET /nuevo */
router.get('/nuevo', function(req, res, next) {
    res.render('links/nuevo');
});

/* POST /nuevo */
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { modelo, description} = req.body; 
    const newcoche = {
        modelo,
        description,
        user_id: req.session.user.id
    };
    await pool.query('UPDATE coches set ? WHERE id = ?', [newcoche, id]);
    res.redirect('/links/lista');
});

// GET /editar
router.get('/editar/:id', async (req, res, next) => {
    const {id} = req.params;
    const coches = await pool.query('SELECT * FROM coches WHERE id=?', [id]);
    console.log(coches);
    res.render('links/editar', {coche: coches[0]});
});

/* POST /editar */
router.post('/editar/:id', async(req, res, next)=> {
    const {id} = req.params;
    const {modelo, description} = req.body;
    const newcoche = {
        modelo,
        description
    };
    coches = await pool.query('UPDATE coches set ? WHERE id=?', [newcoche, id]);
    res.redirect('/links/lista');
});


/* GET /eliminar */
router.get('/eliminar/:id', async(req, res, next)=> {
    const {id} = req.params;
    await pool.query('DELETE FROM coches WHERE id=?', [id]);
    res.redirect('/links/lista');
});


module.exports = router;
