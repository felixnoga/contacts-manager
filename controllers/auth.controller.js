const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

const validateLoginUser = [
  check('email', 'Email introducido incorrecto').isEmail(),
  check('password', 'El password introducido es incorrecto')
    .trim()
    .isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Las credenciales son incorrectas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Las credenciales son incorrectas' });
    }
    const payload = {
      user: {
        id: user.id,
        name: user.name
      }
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000
      },
      (err, token) => {
        res.json({ token });
      }
    );
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: 'Hubo un problema con el servidor' });
  }
};

const getAuthorizedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: 'Hubo un problema con el servidor' });
  }
};

module.exports = { validateLoginUser, loginUser, getAuthorizedUser };
