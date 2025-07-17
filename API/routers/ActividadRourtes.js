const express = require('express');
const router = express.Router();
const Actividad = require('../models/Actividad');

// POST
router.post('/', async (req, res) => {
    try {
        const nuevaActividad = new Actividad(req.body);
        await nuevaActividad.save();
        res.status(201).json(nuevaActividad);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all
router.get('/', async (req, res) => {
    try {
        const actividades = await Actividad.find().populate('residentes personal');
        res.json(actividades);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET by id
router.get('/:id', async (req, res) => {
    try {
        const actividad = await Actividad.findOne({ id: req.params.id }).populate('residentes personal');
        actividad ? res.json(actividad) : res.status(404).json({ error: 'Actividad no encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const actualizada = await Actividad.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        actualizada ? res.json(actualizada) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const eliminada = await Actividad.findOneAndDelete({ id: req.params.id });
        eliminada ? res.json({ mensaje: 'Actividad eliminada' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
