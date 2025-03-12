const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const ContactsControllers = require('../controllers/contactsController');

router
    .route('/')
    .get(ContactsControllers.getContacts)
.post(ContactsControllers.createContact)
router
    .route('/:id')
    .delete(ContactsControllers.deletePost)
module.exports = {contactsRouter: router};