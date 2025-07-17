// Declarar librerías
const express = require('express');
const router = express.Router();
const Medicamento = require('../models/Medicamento');

// POST: crear un nuevo medicamento
router.post('/', async (req, res) => {
    try {
        const nuevoMedicamento = new Medicamento(req.body);
        await nuevoMedicamento.save();
        res.status(201).json(nuevoMedicamento);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: obtener todos los medicamentos
router.get('/', async (req, res) => {
    try {
        const listaMedicamentos = await Medicamento.find();
        res.json(listaMedicamentos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: obtener un medicamento por su id personalizado
router.get('/:id', async (req, res) => {
    try {
        const medicamento = await Medicamento.findOne({ id: req.params.id });
        if (medicamento) {
            res.json(medicamento);
        } else {
            res.status(404).json({ error: "No se encontró el medicamento" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: actualizar un medicamento por su id personalizado
router.put('/:id', async (req, res) => {
    try {
        const medicamentoActualizado = await Medicamento.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (medicamentoActualizado) {
            res.json(medicamentoActualizado);
        } else {
            res.status(404).json({ error: "No se encontró el medicamento para actualizar" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: eliminar un medicamento por su id personalizado
router.delete('/:id', async (req, res) => {
    try {
        const medicamentoEliminado = await Medicamento.findOneAndDelete({ id: req.params.id });
        if (medicamentoEliminado) {
            res.status(200).json({ mensaje: "El medicamento fue eliminado" });
        } else {
            res.status(404).json({ error: "No se encontró el medicamento" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
