import { validateUserData } from '../util/validators';
import { UserModel } from '../models/User';
import { UserData } from '../types/userTypes';

export class UserService {
  async getAllUsers() {
    return await UserModel.find();
  }

  async getUserById(id: string) {
    return await UserModel.findById(id);
  }

  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email: email });
  }

  async createUser(userData: UserData) {
    if (!validateUserData(userData)) {
      return null;
    }
    return await UserModel.create(userData);
  }

  async updateUser(id: string, userData: UserData) {
    if (!validateUserData(userData)) {
      return null;
    }
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  }
}

export const userService = new UserService();
