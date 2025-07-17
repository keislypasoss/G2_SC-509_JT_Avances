const express = require('express');
const router = express.Router();
const Voluntario = require('../models/Voluntario');

router.post('/', async (req, res) => {
    try {
        const nuevoVoluntario = new Voluntario(req.body);
        await nuevoVoluntario.save();
        res.status(201).json(nuevoVoluntario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const voluntarios = await Voluntario.find().populate('actividades_realizadas');
        res.json(voluntarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const voluntario = await Voluntario.findOne({ id: req.params.id }).populate('actividades_realizadas');
        voluntario ? res.json(voluntario) : res.status(404).json({ error: 'No encontrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Voluntario.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        actualizado ? res.json(actualizado) : res.status(404).json({ error: 'No encontrado' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Voluntario.findOneAndDelete({ id: req.params.id });
        eliminado ? res.json({ mensaje: 'Voluntario eliminado' }) : res.status(404).json({ error: 'No encontrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
