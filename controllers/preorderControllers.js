const { Preorder, Phone } = require('./../models');

module.exports.getPreorders = async (req, res, next) => {
  try {
    const foundPreorders = await Preorder.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Phone,
        attributes: ['model', 'brand'],
      },
    });

    res.status(200).send({ data: foundPreorders });
  } catch (err) {
    next(err);
  }
};
