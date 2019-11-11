const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Tarefa = mongoose.model('Tarefa', new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: String,
    prioridade: Number
}));

router.get('/', async (req, res) => {
    const tarefas = await Tarefa.find().sort({ titulo: 1 });

    res.send(tarefas);
});

router.post('/', async (req, res) => {
    
});

module.exports = router;