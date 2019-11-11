const express = require('express');
const mongoose = require('mongoose');
const home = require('./routes/home');
const tarefas = require('./routes/tarefas');

const app = express();

app.use(express.json());

app.use('/', home);
app.use('/api/tarefas', tarefas);

mongoose.connect('mongodb://localhost/test-api-db',  { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });