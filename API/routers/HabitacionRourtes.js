// Declarar librerías
const express = require('express');
const router = express.Router();
const Habitacion = require('../models/Habitacion');

// POST: crear una nueva habitación
router.post('/', async (req, res) => {
    try {
        const nuevaHabitacion = new Habitacion(req.body);
        await nuevaHabitacion.save();
        res.status(201).json(nuevaHabitacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: obtener todas las habitaciones
router.get('/', async (req, res) => {
    try {
        const listaHabitaciones = await Habitacion.find().populate('residentes');
        res.json(listaHabitaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: obtener una habitación por su id personalizado
router.get('/:id', async (req, res) => {
    try {
        const habitacion = await Habitacion.findOne({ id: req.params.id }).populate('residentes');
        if (habitacion) {
            res.json(habitacion);
        } else {
            res.status(404).json({ error: "No se encontró la habitación" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: actualizar una habitación por su id personalizado
router.put('/:id', async (req, res) => {
    try {
        const habitacionActualizada = await Habitacion.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (habitacionActualizada) {
            res.json(habitacionActualizada);
        } else {
            res.status(404).json({ error: "No se encontró la habitación para actualizar" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: eliminar una habitación por su id personalizado
router.delete('/:id', async (req, res) => {
    try {
        const habitacionEliminada = await Habitacion.findOneAndDelete({ id: req.params.id });
        if (habitacionEliminada) {
            res.status(200).json({ mensaje: "La habitación fue eliminada" });
        } else {
            res.status(404).json({ error: "No se encontró la habitación" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
