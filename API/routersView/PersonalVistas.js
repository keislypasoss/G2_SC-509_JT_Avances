// routers/PersonalVistas.js
const express = require('express');
const router = express.Router();
const Personal = require('../models/Personal');

// Vista principal
router.get('/', async (req, res) => {
    try {
        const listaPersonal = await Personal.find();
        res.render('personal/index', { personal: listaPersonal });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Formulario de nuevo personal
router.get('/nuevo', (req, res) => {
    res.render('personal/new');
});

// Guardar nuevo personal
router.post('/crear', async (req, res) => {
    try {
        const nuevo = new Personal(req.body);
        await nuevo.save();
        res.redirect('/personal');
    } catch (err) {
        res.status(400).send(err.message);
    }
});


// Editar personal
router.get('/editar/:id', async (req, res) => {
    try {
        const personal = await Personal.findById(req.params.id); // ✅ _id correcto
        if (personal) {
            res.render('personal/edit', { personal });
        } else {
            res.status(404).send("No encontrado");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Actualizar personal
router.post('/actualizar/:id', async (req, res) => {
    try {
        await Personal.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/personal');
    } catch (err) {
        res.status(400).send(err.message);
    }
});


// Eliminar personal
router.post('/eliminar/:id', async (req, res) => {
    try {
        await Personal.findByIdAndDelete(req.params.id);
        res.redirect('/personal');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
