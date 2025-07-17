// Declarar librerías
const express = require('express');
const router = express.Router();
const Personal = require('../models/Personal');

// POST: crear un nuevo personal
router.post('/', async (req, res) => {
    try {
        const nuevoPersonal = new Personal(req.body);
        await nuevoPersonal.save();
        res.status(201).json(nuevoPersonal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: obtener todo el personal
router.get('/', async (req, res) => {
    try {
        const listaPersonal = await Personal.find();
        res.json(listaPersonal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: obtener un personal por su id personalizado
router.get('/:id', async (req, res) => {
    try {
        const personal = await Personal.findOne({ id: req.params.id });
        if (personal) {
            res.json(personal);
        } else {
            res.status(404).json({ error: "No se encontró el personal" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: actualizar un personal por su id personalizado
router.put('/:id', async (req, res) => {
    try {
        const personalActualizado = await Personal.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (personalActualizado) {
            res.json(personalActualizado);
        } else {
            res.status(404).json({ error: "No se encontró el personal para actualizar" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: eliminar un personal por su id personalizado
router.delete('/:id', async (req, res) => {
    try {
        const personalEliminado = await Personal.findOneAndDelete({ id: req.params.id });
        if (personalEliminado) {
            res.status(200).json({ mensaje: "El personal fue eliminado" });
        } else {
            res.status(404).json({ error: "No se encontró el personal" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
