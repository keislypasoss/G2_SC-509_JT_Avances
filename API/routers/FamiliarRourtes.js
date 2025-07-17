// Declarar librerías
const express = require('express');
const router = express.Router();
const Familiar = require('../models/Familiar');

// POST: crear un nuevo familiar
router.post('/', async (req, res) => {
    try {
        const nuevoFamiliar = new Familiar(req.body);
        await nuevoFamiliar.save();
        res.status(201).json(nuevoFamiliar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: obtener todos los familiares
router.get('/', async (req, res) => {
    try {
        const listaFamiliares = await Familiar.find().populate('residente');
        res.json(listaFamiliares);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: obtener un familiar por su id personalizado
router.get('/:id', async (req, res) => {
    try {
        const familiar = await Familiar.findOne({ id: req.params.id }).populate('residente');
        if (familiar) {
            res.json(familiar);
        } else {
            res.status(404).json({ error: "No se encontró el familiar" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: actualizar un familiar por su id personalizado
router.put('/:id', async (req, res) => {
    try {
        const familiarActualizado = await Familiar.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (familiarActualizado) {
            res.json(familiarActualizado);
        } else {
            res.status(404).json({ error: "No se encontró el familiar para actualizar" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: eliminar un familiar por su id personalizado
router.delete('/:id', async (req, res) => {
    try {
        const familiarEliminado = await Familiar.findOneAndDelete({ id: req.params.id });
        if (familiarEliminado) {
            res.status(200).json({ mensaje: "El familiar fue eliminado" });
        } else {
            res.status(404).json({ error: "No se encontró el familiar" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
