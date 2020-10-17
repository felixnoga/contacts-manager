const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const contactsController = require('../controllers/contacts.controller');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET
});

const uploadS3 = multerS3({
  s3: s3,
  acl: 'public-read',
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const imagePrefix = req.user.id;
    const uniqueSuffix = '-' + Date.now();
    const extension = path.extname(file.originalname);
    const filename = imagePrefix + uniqueSuffix + extension;
    cb(null, filename);
  }
});

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads/images'));
  },
  filename: (req, file, cb) => {
    const imagePrefix = req.user.id;
    const uniqueSuffix = '-' + Date.now();
    const extension = path.extname(file.originalname);
    const filename = imagePrefix + uniqueSuffix + extension;
    cb(null, filename);
  }
});
const options = {
  storage: uploadS3,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (
      extension !== '.jpg' &&
      extension !== '.jpeg' &&
      extension !== '.png' &&
      extension !== '.webp' &&
      mime !== 'image/png' &&
      mime !== 'image/jpg' &&
      mime !== 'image/jpeg' &&
      mime !== 'image/webp'
    ) {
      req.fileValidationError =
        'Archivo no válido. Solo se pueden subir imágenes tipo png, jpg, jpeg y webp.';
      cb(null, false);
    } else {
      req.fileValidationError = null;
      cb(null, true);
    }
  }
};
const upload = multer(options);

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private
router.get('/', authMiddleware, contactsController.getContacts);

//@route    POST api/contacts
//@desc     Add new contact
//@access   Private
router.post(
  '/',
  [authMiddleware, upload.single('image'), contactsController.validateContact],
  contactsController.insertContact
);

//@route    PUT api/contacts
//@desc     Edit a contact
//@access   Private
router.put(
  '/:id',
  [authMiddleware, upload.single('image')],
  contactsController.updateContact
);

//@route    DELETE api/contacts
//@desc     Delete a contact
//@access   Private
router.delete('/:id', authMiddleware, contactsController.deleteContact);

module.exports = router;
