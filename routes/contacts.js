const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const contactsController = require('../controllers/contacts.controller');

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private
router.get('/', authMiddleware, contactsController.getContacts);

//@route    POST api/contacts
//@desc     Add new contact
//@access   Private
router.post(
  '/',
  [authMiddleware, contactsController.validateContact],
  contactsController.insertContact
);

//@route    PUT api/contacts
//@desc     Edit a contact
//@access   Private
router.put('/:id', authMiddleware, contactsController.updateContact);

//@route    DELETE api/contacts
//@desc     Delete a contact
//@access   Private
router.delete('/:id', authMiddleware, contactsController.deleteContact);

module.exports = router;
