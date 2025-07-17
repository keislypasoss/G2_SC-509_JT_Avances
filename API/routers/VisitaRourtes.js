const express = require('express');
const router = express.Router();
const Visita = require('../models/Visita');

router.post('/', async (req, res) => {
    try {
        const nuevaVisita = new Visita(req.body);
        await nuevaVisita.save();
        res.status(201).json(nuevaVisita);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const visitas = await Visita.find().populate('residente');
        res.json(visitas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const visita = await Visita.findOne({ id: req.params.id }).populate('residente');
        visita ? res.json(visita) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizada = await Visita.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        actualizada ? res.json(actualizada) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminada = await Visita.findOneAndDelete({ id: req.params.id });
        eliminada ? res.json({ mensaje: 'Visita eliminada' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
