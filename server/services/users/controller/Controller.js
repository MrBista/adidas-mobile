const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongoConnection');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const User = require('../models/user');

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const createdUser = await User.register({
        username,
        email,
        password,
        role: 'admin',
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: createdUser.insertedId,
        email,
        username,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: 'email is required', status: 400 };
      }
      if (!password) {
        throw { name: 'password is required', status: 400 };
      }
      const getUser = await User.findEmail(email);
      if (!getUser) {
        throw { name: 'Invalid email/password' };
      }
      const checkPassword = comparePassword(password, getUser.password);
      if (!checkPassword) {
        throw { name: 'Invalid email/password' };
      }
      res.status(200).json({ message: getUser.email + ' successfully login' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async allUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async exactUser(req, res, next) {
    try {
      const { id } = req.params;
      const foundedUser = await User.findOne(id);
      res.status(200).json(foundedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const foundedUser = await User.findOne(id);
      if (!foundedUser) {
        throw { name: 'not found users', code: 401 };
      }
      await User.destroy(id);
      res
        .status(200)
        .json({ message: `successfully delete user with id ${id}` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
