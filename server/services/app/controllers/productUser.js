const { Product, Image, Category, User } = require('../models');
const { sequelize } = require('../models');
class ControllerProductUser {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Image,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      });

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const productId = await Product.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Image,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      });
      if (!productId) {
        throw { name: 'not found product' };
      }
      res.status(200).json(productId);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerProductUser;
