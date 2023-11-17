import { UserModel } from '../models/User';
import { UserData } from '../types/userTypes';
import { validateUserData } from '../util/validators';
/**
 * Service class for managing user data.
 */
export class UserService {
  /**
   * Retrieves all users.
   * @returns {Promise<UserModel[]>} A promise that resolves to an array of user models.
   */
  async getAllUsers() {
    return await UserModel.find();
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<UserModel | null>} A promise that resolves to the user model or null if not found.
   */
  async getUserById(id: string) {
    return await UserModel.findById(id);
  }

  /**
   * Retrieves a user by their email.
   * @param {string} email - The email of the user.
   * @returns {Promise<UserModel | null>} A promise that resolves to the user model or null if not found.
   */
  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email: email });
  }

  /**
   * Creates a new user.
   * @param {Object} userData - The user data.
   * @param {string} userData.email - The email of the user.
   * @param {string} userData.name - The name of the user.
   * @param {string} userData.password - The password of the user.
   * @returns {Promise<UserModel | null>} A promise that resolves to the created user model or null if validation fails.
   */
  async createUser(userData: { email: string; name: string; password: string }) {
    if (!validateUserData({ email: userData.email, name: userData.name })) {
      return null;
    }
    return await UserModel.create(userData);
  }

  /**
   * Updates a user by their ID.
   * @param {string} id - The ID of the user.
   * @param {UserData} userData - The updated user data.
   * @param {string} userData.email - The updated email of the user.
   * @param {string} userData.name - The updated name of the user.
   * @returns {Promise<UserModel | null>} A promise that resolves to the updated user model or null if validation fails.
   */
  async updateUser(id: string, userData: UserData) {
    if (!validateUserData(userData)) {
      return null;
    }
    return await UserModel.findByIdAndUpdate(id, { email: userData.email, name: userData.name }, { new: true });
  }
}

export const userService = new UserService();
