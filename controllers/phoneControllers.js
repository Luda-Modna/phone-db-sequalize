const _ = require('lodash');
const createHttpError = require('http-errors');
const { Phone } = require('./../models');
const { EXCLUDE_ATTRIBUTES } = require('./../constants');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const created = await Phone.create(body);

    if (!created) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    const preparedPhone = _.omit(created.get(), EXCLUDE_ATTRIBUTES);

    res.status(201).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundPhones = await Phone.findAll({
      raw: true,
      attributes: { exclude: EXCLUDE_ATTRIBUTES },
      limit,
      offset,
      order: ['id'],
    });

    res.status(200).send({
      data: foundPhones,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPhone = await Phone.findByPk(id, {
      raw: true,
      attributes: { exclude: EXCLUDE_ATTRIBUTES },
    });

    if (!foundPhone) {
      return next(createHttpError(400, 'Phone Not Found'));
    }

    res.status(200).send({ data: foundPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedPhoneCount, [updatedPhone]] = await Phone.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedPhoneCount) {
      return next(createHttpError(404, 'Phone not found ):'));
    }

    const preparedPhone = _.omit(updatedPhone, EXCLUDE_ATTRIBUTES);

    res.status(200).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrCreatePhone = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedPhoneCount, [updatedPhone]] = await Phone.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedPhoneCount) {
      body.id = id;
      return next();
    }

    const preparedPhone = _.omit(updatedPhone, EXCLUDE_ATTRIBUTES);

    res.status(200).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPhoneCount = await Phone.destroy({ where: { id } });
    if (!deletedPhoneCount) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
