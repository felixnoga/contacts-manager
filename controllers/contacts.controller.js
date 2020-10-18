const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET
});

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      name: 1
    });
    res.json(contacts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: 'Hubo un problema con el servidor' });
  }
};

const validateContact = [
  body('name', 'El nombre de contacto es requerido').trim().not().isEmpty(),
  body('email', 'El email de contacto es requerido').isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const insertContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  let imglocation;
  if (req.fileValidationError) {
    return res.status(400).json({ msg: req.fileValidationError });
  } else if (req.file && req.file.size > 1024 * 1024) {
    return res.status(400).json({ msg: 'Tamaño máximo de imagen 1 MB' });
  } else {
    try {
      if (req.file) {
        imglocation = req.file.location;
      }
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        image: imglocation,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ msg: 'Hubo un problema con el servidor' });
    }
  }
};

const updateContact = async (req, res) => {
  const { name, email, phone, type, oldImage } = req.body;

  const updatedContact = {};
  if (name) updatedContact.name = name;
  if (email) updatedContact.email = email;
  if (phone) updatedContact.phone = phone;
  if (type) updatedContact.type = type;
  if (req.file) {
    updatedContact.image = req.file.location;
    s3.deleteObject(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: oldImage
      },
      (err, data) => {
        if (err) console.log(err);
        else console.log(data);
      }
    );
  }

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact)
      return res.status(404).json({ msg: 'Contacto no encontrado' });
    //El usuario es el propietario del contacto
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado a hacer update' });
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, updatedContact, {
      new: true,
      useFindAndModify: false
    });
    res.json(contact);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: 'Ha ocurrido un error en el servidor' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact)
      return res.status(404).json({ msg: 'Contacto no encontrado' });
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'No autorizado a eliminar' });
    const deletedContact = await Contact.findByIdAndRemove(req.params.id);
    const url = new URL(deletedContact.image);
    const image = url.pathname.substring(1);
    image !== 'default.png' &&
      s3.deleteObject(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: image
        },
        (err, data) => {
          if (err) console.log(err);
          else console.log(data);
        }
      );
    res.json({ msg: 'Contacto eliminado', contacto: deletedContact });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: 'Ha ocurrido un error en el servidor' });
  }
};

module.exports = {
  getContacts,
  insertContact,
  updateContact,
  deleteContact,
  validateContact
};
