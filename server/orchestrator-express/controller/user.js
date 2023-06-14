const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const urlUser = 'http://localhost:4001';
class ControllerUser {
  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const { data } = await axios({
        url: urlUser + '/users/register',
        data: { username, email, password, role, phoneNumber, address },
        method: 'post',
      });
      await redis.del('user:get');
      res.status(200).json({
        message: 'user with username' + username + 'successfully created',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getUsers(req, res, next) {
    try {
      const userCache = await redis.get('user:get');
      if (userCache) {
        let userRes = JSON.parse(userCache);
        return res.status(200).json(userRes);
      }
      const { data } = await axios.get(urlUser + '/users');
      await redis.set('user:get', JSON.stringify(data));
      return res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async exactUser(req, res, next) {
    try {
      const { id } = req.params;
      const exactUserCache = await redis.get('user:get:' + id);
      if (exactUserCache) {
        let userRes = JSON.parse(exactUserCache);
        return res.status(200).json(userRes);
      }
      const { data: response } = await axios.get(urlUser + '/users/' + id);
      redis.set('user:get:' + response._id, JSON.stringify(response), 'px', 3);
      return res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: urlUser + '/users/' + id,
        method: 'delete',
      });
      await redis.del('user:get');
      res
        .status(200)
        .json({ message: 'successfully delete user with id ' + id });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ControllerUser;
