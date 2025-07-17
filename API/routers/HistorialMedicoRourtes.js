const express = require('express');
const router = express.Router();
const HistorialMedico = require('../models/HistorialMedico');

router.post('/', async (req, res) => {
    try {
        const nuevoHistorial = new HistorialMedico(req.body);
        await nuevoHistorial.save();
        res.status(201).json(nuevoHistorial);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const historiales = await HistorialMedico.find().populate('residente tratamientos_anteriores');
        res.json(historiales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const historial = await HistorialMedico.findOne({ id: req.params.id }).populate('residente tratamientos_anteriores');
        historial ? res.json(historial) : res.status(404).json({ error: 'No encontrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizado = await HistorialMedico.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        actualizado ? res.json(actualizado) : res.status(404).json({ error: 'No encontrado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await HistorialMedico.findOneAndDelete({ id: req.params.id });
        eliminado ? res.json({ mensaje: 'Historial eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
