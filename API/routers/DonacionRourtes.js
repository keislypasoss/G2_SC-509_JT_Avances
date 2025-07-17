const express = require('express');
const router = express.Router();
const Donacion = require('../models/Donacion');

router.post('/', async (req, res) => {
    try {
        const nuevaDonacion = new Donacion(req.body);
        await nuevaDonacion.save();
        res.status(201).json(nuevaDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const donaciones = await Donacion.find();
        res.json(donaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const donacion = await Donacion.findOne({ id: req.params.id });
        donacion ? res.json(donacion) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizada = await Donacion.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        actualizada ? res.json(actualizada) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminada = await Donacion.findOneAndDelete({ id: req.params.id });
        eliminada ? res.json({ mensaje: 'Donación eliminada' }) : res.status(404).json({ error: 'No encontrada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
