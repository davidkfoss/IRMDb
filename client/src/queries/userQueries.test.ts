import { random } from 'lodash';
import { client } from '../client';
import { createUserMutation, getAllUsersQuery, getUserByEmailQuery, getUserByIdQuery } from './userQueries';

describe('User Queries', () => {
  test('getAllUsersQuery should return all users', async () => {
    const { data } = await client.query({ query: getAllUsersQuery });
    expect(data.GetAllUsers).toBeDefined();
    expect(Array.isArray(data.GetAllUsers)).toBe(true);
  });

  test('getUserByIdQuery should return a user by ID', async () => {
    const id = '6559d8a2ae3cedf55ba93da9';
    const { data } = await client.query({ query: getUserByIdQuery, variables: { id } });
    expect(data.GetUserById).toBeDefined();
    expect(data.GetUserById.id).toBe(id);
  });

  test('getUserByEmailQuery should return a user by email', async () => {
    const email = 'ufkefu@ce.om';
    const { data } = await client.query({ query: getUserByEmailQuery, variables: { email } });
    expect(data.GetUserByEmail).toBeDefined();
    expect(data.GetUserByEmail.email).toBe(email);
  });
});

describe('User Mutations', () => {
  test('createUserMutation should create a new user', async () => {
    const name = 'John Doe';
    const email = 'test@example.com' + random(1, 99999);
    const password = 'password';
    await client.mutate({ mutation: createUserMutation, variables: { name, email, password } }).then(async () => {
      const { data } = await client.query({ query: getUserByEmailQuery, variables: { email } });
      expect(data.GetUserByEmail).toBeDefined();
      expect(data.GetUserByEmail.email).toBe(email);
    });
  });
});
