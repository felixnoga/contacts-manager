require('dotenv').config();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const validatePostedUser = [
  body('name', 'El nombre de usuario es requerido').trim().not().isEmpty(),
  body('email', 'El email no es válido').isEmail(),
  body('password', 'El password debe contener al menos 6 caracteres').isLength({
    min: 6
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
const insertUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: 'El usuario ya existe' });
    } else {
      const newUser = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id
        }
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
  } catch (err) {
    res.status(500).json({ error: 'Hubo un problema en el servidor' });
    console.log(err);
  }
};

module.exports = { validatePostedUser, insertUser };
