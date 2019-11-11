const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('API de tarefas para o CompCult.');
})

module.exports = router;

