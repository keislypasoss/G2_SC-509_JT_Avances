const express = require('express');
const router = express.Router();
const CitaMedica = require('../models/CitaMedica');

router.post('/', async (req, res) => {
    try {
        const nuevaCita = new CitaMedica(req.body);
        await nuevaCita.save();
        res.status(201).json(nuevaCita);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const citas = await CitaMedica.find().populate('residente profesional_salud');
        res.json(citas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cita = await CitaMedica.findOne({ id: req.params.id }).populate('residente profesional_salud');
        cita ? res.json(cita) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizada = await CitaMedica.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        actualizada ? res.json(actualizada) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminada = await CitaMedica.findOneAndDelete({ id: req.params.id });
        eliminada ? res.json({ mensaje: 'Cita eliminada' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
