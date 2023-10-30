import { gql } from '@apollo/client';

const getAllUsersQuery = gql`
  {
    GetAllUsers {
      id
      name
      email
      profilePictureUrl
    }
  }
`;

const getUserByIdQuery = gql`
  query ($id: ID!) {
    GetUserById(id: $id) {
      id
      name
      email
      profilePictureUrl
    }
  }
`;

const getUserByEmailQuery = gql`
  query ($email: String!) {
    GetUserByEmail(email: $email) {
      id
      name
      email
      profilePictureUrl
    }
  }
`;

const createUserMutation = gql`
  mutation ($name: String!, $email: String!, $profilePictureUrl: String!) {
    CreateUser(name: $name, email: $email, profilePictureUrl: $profilePictureUrl) {
      id
      name
      email
      profilePictureUrl
    }
  }
`;

export { getAllUsersQuery, getUserByIdQuery, getUserByEmailQuery, createUserMutation };
