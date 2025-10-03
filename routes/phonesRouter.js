const { Router } = require('express');

const phonesRouter = Router();

phonesRouter.route('/').get().post();

phonesRouter.route('/:id').get().patch().put().delete();

module.exports = phonesRouter;
