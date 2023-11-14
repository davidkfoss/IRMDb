import { gql } from '@apollo/client';

const getAllUsersQuery = gql`
  {
    GetAllUsers {
      id
      name
      email
    }
  }
`;

const getUserByIdQuery = gql`
  query ($id: ID!) {
    GetUserById(id: $id) {
      id
      name
      email
    }
  }
`;

const getUserByEmailQuery = gql`
  query ($email: String!) {
    GetUserByEmail(email: $email) {
      id
      name
      email
    }
  }
`;

const getUserAuthQuery = gql`
  query ($email: String!, $password: String!) {
    GetUserAuth(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const createUserMutation = gql`
  mutation ($name: String!, $email: String!, $password: String!) {
    CreateUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export { createUserMutation, getAllUsersQuery, getUserByEmailQuery, getUserByIdQuery, getUserAuthQuery };
