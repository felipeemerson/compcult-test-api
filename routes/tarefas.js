const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const Tarefa = mongoose.model('Tarefa', new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: {type: String, required: true},
    prioridade: {type: Number, required: true}
}));

router.get('/', async (req, res) => {
    const tarefas = await Tarefa.find().sort({ titulo: 1 });

    res.send(tarefas);
});

router.get('/:id', async (req, res) => {
    const tarefa = await Tarefa.findById(req.params.id);

    if(!tarefa) res.status(404).send('Nenhuma tarefa com este ID foi encontrada.');

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

router.put('/:id', async (req, res) => {
    const { error } = validaTarefa(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        prioridade: req.body.prioridade,
        new: true
    })
    .catch(() => res.status(404).send('Nenhuma tarefa com este ID foi encontrada.'));

    res.send(tarefa);
});

router.delete('/:id', async (req, res) => {
    const tarefa = await Tarefa.findByIdAndRemove(req.params.id);

    if(!tarefa) res.status(404).send('Nenhuma tarefa com este ID foi encontrada.');

    res.send(tarefa);
});

function validaTarefa(tarefa) {
    const schema = {
      titulo: Joi.string().min(3).required(),
      descricao: Joi.string().min(10).required(),
      prioridade: Joi.number().integer().min(1).required()
    };
  
    return Joi.validate(tarefa, schema);
  }

module.exports = router;