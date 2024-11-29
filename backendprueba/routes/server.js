const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/marvel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos'))
.catch(err => console.log('Error en la conexión a la base de datos', err));

const characterSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
  img: String,
});

const Character = mongoose.model('Character', characterSchema);

app.get('/characters', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).send('Error al obtener personajes');
  }
});

app.post('/characters', async (req, res) => {
  const { name, date, description, img } = req.body;
  try {
    const newCharacter = new Character({ name, date, description, img });
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).send('Error al guardar el personaje');
  }
});


app.listen(5000, () => {
  console.log('Servidorescuchando en puerto 5000');
});