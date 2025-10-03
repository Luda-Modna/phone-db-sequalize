const { Router } = require('express');
const { phonesController } = require('../controllers');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(phonesController.getPhones)
  .post(phonesController.createPhone);

phonesRouter
  .route('/:id')
  .get(phonesController.getPhoneById)
  .patch(phonesController.updatePhoneById)
  .put(phonesController.updateOrCreatePhone, phonesController.createPhone)
  .delete(phonesController.deletePhoneById);

module.exports = phonesRouter;
