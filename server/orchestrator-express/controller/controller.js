const Redis = require('ioredis');
const redis = new Redis(6379, '127.0.0.1');
const axios = require('axios');
const urlProduct = 'http://localhost:4002';
const urlUsers = 'http://localhost:4001';
class ControllerProduct {
  static async getProducts(req, res, next) {
    try {
      const productData = await redis.get('products:get');
      if (productData) {
        let resData = JSON.parse(productData);
        return res.status(200).json(resData);
      }
      let { data } = await axios.get(urlProduct + '/');
      const { data: users } = await axios.get(urlUsers + '/users');
      let result = data.map((el) => {
        let authorFounded = {};
        users.forEach((user) => {
          if (user._id === el.mongoId) {
            authorFounded.username = user.username;
            authorFounded.email = user.email;
            authorFounded.role = user.role;
            authorFounded.id = user._id;
          }
        });
        return { ...el, author: authorFounded };
      });
      redis.set('products:get', JSON.stringify(result));
      return res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getDetailProduct(req, res, next) {
    try {
      const { id } = req.params;
      const detailProduct = await redis.get('products:get' + id);
      if (detailProduct) {
        const resDetail = JSON.parse(detailProduct);
        return res.status(200).json(resDetail);
      }

      const { data } = await axios.get(urlProduct + '/pub/' + id);
      await redis.set('products:get' + id, JSON.stringify(data), 'px', 1000);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { name, description, price, mainImg, categoryId, images } =
        req.body;
      const { data } = await axios({
        url: urlProduct,
        method: 'post',
        data: { name, description, price, mainImg, categoryId, images },
      });
      await redis.del('products:get');
      res.status(201).json({ message: 'successfully adding product' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, mainImg, categoryId, images } =
        req.body;
      const { data } = await axios({
        method: 'put',
        data: { name, description, price, mainImg, categoryId, images },
        url: urlProduct + '/' + id,
      });
      await redis.del('products:get');
      res.status(200).json({ message: 'successfully update data' });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: 'delete',
        url: urlProduct + '/' + id,
      });
      await redis.del('products:get');
      res.status(200).json({
        message: `successfully delete product with id ${id}`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = ControllerProduct;
