const express = require('express');
const router = express.Router();
const Residente = require('../models/Residente');

// Vista: Lista de residentes
router.get('/', async (req, res) => {
  try {
    const residentes = await Residente.find();
    res.render('residentes/index', { residentes });
  } catch (err) {
    console.error('Error al cargar residentes:', err);
    res.status(500).send('Error al cargar la lista de residentes.');
  }
});

// Vista: Formulario nuevo residente
router.get('/new', (req, res) => {
  res.render('residentes/new');
});

// Procesar formulario de nuevo residente
router.post('/crear', async (req, res) => {
  try {
    const nuevoResidente = new Residente(req.body);
    await nuevoResidente.save();
    res.redirect('/residentes');
  } catch (err) {
    res.status(500).send('Error al guardar residente');
  }
});


// Vista: Formulario editar residente
router.get('/editar/:id', async (req, res) => {
  try {
    const residente = await Residente.findById(req.params.id);
    if (!residente) {
      return res.status(404).send('Residente no encontrado.');
    }
    res.render('residentes/edit', { residente });
  } catch (err) {
    console.error('Error al cargar residente para edición:', err);
    res.status(500).send('Error al cargar el residente.');
  }
});

// Procesar edición de residente
router.post('/editar/:id', async (req, res) => {
  try {
    await Residente.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/residentes');
  } catch (err) {
    console.error('Error al editar residente:', err);
    res.status(500).send('Error al editar el residente.');
  }
});

// Eliminar residente
router.post('/eliminar/:id', async (req, res) => {
  try {
    await Residente.findByIdAndDelete(req.params.id);
    res.redirect('/residentes');
  } catch (err) {
    console.error('Error al eliminar residente:', err);
    res.status(500).send('Error al eliminar el residente.');
  }
});

module.exports = router;
