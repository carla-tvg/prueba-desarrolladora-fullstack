const express = require('express');
const { body, validationResult } = require('express-validator');
const Character = require('../models/Character');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ msg: 'Personaje no encontrado' });
    }
    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    body('name', '').matches(/^[a-zA-Z\s]+$/),
    body('date', '').matches(/^[a-zA-Z\s]+$/),
    body('description', '').matches(/^[a-zA-Z\s]+$/),
    body('img', 'Image URL is required').isURL(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, date, description, img } = req.body;

    try {
      const newCharacter = new Character({
        name,
        date,
        description,
        img,
      });

      await newCharacter.save();
      res.status(201).json(newCharacter);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;