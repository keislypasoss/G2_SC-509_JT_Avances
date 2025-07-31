// Declarar nuestras librerías
const express = require('express');
const router = express.Router();
const Residente = require('../models/Residente');

// POST: insertar un nuevo residente
router.post('/', async (req, res) => {
    try {
        const nuevoResidente = new Residente(req.body);
        await nuevoResidente.save();
        res.status(201).json(nuevoResidente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: obtener todos los residentes
router.get('/', async (req, res) => {
    try {
        const listaResidentes = await Residente.find();
        res.json(listaResidentes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: obtener un residente por su id (campo personalizado 'id')
router.get('/:id', async (req, res) => {
  try {
    const idNum = Number(req.params.id);
    const residente = await Residente.findOne({ id: idNum });
    if (residente) {
      res.json(residente);
    } else {
      res.status(404).json({ error: "No se encontró el residente" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT: actualizar un residente por su id
router.put('/:id', async (req, res) => {
    try {
        const residenteActualizado = await Residente.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (residenteActualizado) {
            res.json(residenteActualizado);
        } else {
            res.status(404).json({ error: "No se encontró el residente para actualizar" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: eliminar un residente por su id
router.delete('/:id', async (req, res) => {
    try {
        const residenteEliminado = await Residente.findOneAndDelete({ id: req.params.id });
        if (residenteEliminado) {
            res.status(200).json({ mensaje: "El residente fue eliminado" });
        } else {
            res.status(404).json({ error: "No se encontró el residente" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
