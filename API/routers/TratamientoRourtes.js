// Declarar librerías
const express = require('express');
const router = express.Router();
const Tratamiento = require('../models/Tratamiento');

// POST: crear un nuevo tratamiento
router.post('/', async (req, res) => {
    try {
        const nuevoTratamiento = new Tratamiento(req.body);
        await nuevoTratamiento.save();
        res.status(201).json(nuevoTratamiento);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: obtener todos los tratamientos con datos poblados
router.get('/', async (req, res) => {
    try {
        const listaTratamientos = await Tratamiento.find()
            .populate('residente')
            .populate('medicamento')
            .populate('personal_asignado');
        res.json(listaTratamientos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: obtener un tratamiento por id personalizado
router.get('/:id', async (req, res) => {
    try {
        const tratamiento = await Tratamiento.findOne({ id: req.params.id })
            .populate('residente')
            .populate('medicamento')
            .populate('personal_asignado');
        if (tratamiento) {
            res.json(tratamiento);
        } else {
            res.status(404).json({ error: "No se encontró el tratamiento" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: actualizar un tratamiento por id personalizado
router.put('/:id', async (req, res) => {
    try {
        const tratamientoActualizado = await Tratamiento.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        )
        .populate('residente')
        .populate('medicamento')
        .populate('personal_asignado');

        if (tratamientoActualizado) {
            res.json(tratamientoActualizado);
        } else {
            res.status(404).json({ error: "No se encontró el tratamiento para actualizar" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: eliminar un tratamiento por id personalizado
router.delete('/:id', async (req, res) => {
    try {
        const tratamientoEliminado = await Tratamiento.findOneAndDelete({ id: req.params.id });
        if (tratamientoEliminado) {
            res.status(200).json({ mensaje: "El tratamiento fue eliminado" });
        } else {
            res.status(404).json({ error: "No se encontró el tratamiento" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
