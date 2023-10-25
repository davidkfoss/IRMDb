const { UserModel } = require('../models/User');

class UserService {
  async getAllUsers() {
    return await UserModel.find();
  }

  async getUserById(id) {
    return await UserModel.findById(id);
  }

  async createUser(userData) {
    return await UserModel.create(userData);
  }

  async updateUser(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

module.exports.UserService = new UserService();
