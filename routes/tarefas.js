const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
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

router.get('/:id', async (req, res) => {
    const tarefa = await Tarefa.findById(req.params.id);

    if(!tarefa) res.status(404).send('Tarefa com este ID não foi encontrada.');

    res.send(tarefa);
});

router.post('/', async (req, res) => {
    const { error } = validaTarefa(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let tarefa = new Tarefa({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        prioridade: req.body.prioridade
    });

    try {
        tarefa = await tarefa.save();
        res.send(tarefa);
    }
    catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
});

function validaTarefa(tarefa) {
    const schema = {
      titulo: Joi.string().min(3).required(),
      descricao: Joi.string(),
      prioridade: Joi.number()
    };
  
    return Joi.validate(tarefa, schema);
  }

module.exports = router;