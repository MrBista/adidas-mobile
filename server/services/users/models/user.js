const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongoConnection');
const { hashPassword } = require('../helpers/bcrypt');

class User {
  static getCollection() {
    return getDatabase().collection('users');
  }
  static register({ username, email, password, role, phoneNumber, address }) {
    try {
      const makeHashPassword = hashPassword(password);
      const createdUser = this.getCollection().insertOne({
        username,
        email,
        password: makeHashPassword,
        role,
        phoneNumber,
        address,
      });
      return createdUser;
    } catch (err) {
      throw err;
    }

    return createdUser;
  }
  static async findAll() {
    try {
      return this.getCollection().find().toArray();
    } catch (err) {
      throw err;
    }
  }
  static async findOne(id) {
    try {
      return User.getCollection().findOne({
        _id: new ObjectId(id),
      });
    } catch (err) {
      throw err;
    }
  }

  static async destroy(id) {
    return User.getCollection().deleteOne({
      _id: new ObjectId(id),
    });
  }
  static async findEmail(email) {
    return User.getCollection().findOne({
      email,
    });
  }
}

module.exports = User;
