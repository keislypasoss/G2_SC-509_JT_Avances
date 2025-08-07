const express = require('express');
const router = express.Router();
const CitaMedica = require('../models/CitaMedica');

// POST: crear una nueva cita médica
router.post('/', async (req, res) => {
    try {
        const nuevaCita = new CitaMedica(req.body);
        await nuevaCita.save();
        res.status(201).json(nuevaCita);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: obtener todas las citas médicas
router.get('/', async (req, res) => {
    try {
        const citas = await CitaMedica.find()
            .populate('residente', 'nombre')  
            .populate('profesional_salud', 'nombre'); 
        res.json(citas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET: obtener una cita médica por ID personalizado
router.get('/:id', async (req, res) => {
    try {
        const cita = await CitaMedica.findOne({ id: req.params.id });
        if (cita) {
            res.json(cita);
        } else {
            res.status(404).json({ error: "No se encontró la cita médica" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: actualizar una cita médica por ID personalizado
router.put('/:id', async (req, res) => {
    try {
        const citaActualizada = await CitaMedica.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (citaActualizada) {
            res.json(citaActualizada);
        } else {
            res.status(404).json({ error: "No se encontró la cita médica para actualizar" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: eliminar una cita médica por ID personalizado
router.delete('/:id', async (req, res) => {
    try {
        const citaEliminada = await CitaMedica.findOneAndDelete({ id: req.params.id });
        if (citaEliminada) {
            res.status(200).json({ mensaje: "La cita médica fue eliminada" });
        } else {
            res.status(404).json({ error: "No se encontró la cita médica" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
