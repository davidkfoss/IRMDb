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

  async getAuthUser(userData: { email: string; password: string }) {
    return await UserModel.findOne(userData);
  }

  async createUser(userData: { email: string; name: string; password: string }) {
    if (!validateUserData({ email: userData.email, name: userData.name })) {
      return null;
    }
    return await UserModel.create(userData);
  }

  async updateUser(id: string, userData: UserData) {
    if (!validateUserData(userData)) {
      return null;
    }
    return await UserModel.findByIdAndUpdate(id, { email: userData.email, name: userData.name }, { new: true });
  }
}

export const userService = new UserService();
