const express = require('express');
const { Router } = express;
const router = Router();

const Contenedor = require('./contenedor');
let contenedor = new Contenedor('productos');
  
router.get('', async function(req, res) {
    let list = await contenedor.getAll();
    res.send(list);
});

router.get('/:id', async function(req, res) {
    let id = req.params.id;
    let product = await contenedor.getById(id);
    if (product == null) {
        product = { error: 'producto no encontrado'};
    }
    res.send(product);
});

router.post('', async function(req, res) {
    let product = req.body;
    let id = await contenedor.save(product);
    res.send(id.toString());
});

router.put('/:id', async function(req, res) {
    let product = req.body;
    await contenedor.update(product);
    res.send();
});

router.delete('/:id', async function(req, res) {
    let id = req.params.id;
    await contenedor.deleteById(id);
    res.send(id);
});

module.exports = router;