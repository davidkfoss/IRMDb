const { validateUserData } = require('../util/validators');
const { UserModel } = require('../models/User');

class UserService {
  async getAllUsers() {
    return await UserModel.find();
  }

  async getUserById(id) {
    return await UserModel.findById(id);
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email: email });
  }

  async createUser(userData) {
    if (!validateUserData(userData)) {
      return null;
    }
    return await UserModel.create(userData);
  }

  async updateUser(id, userData) {
    if (!validateUserData(userData)) {
      return null;
    }
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }
}

module.exports.UserService = new UserService();
