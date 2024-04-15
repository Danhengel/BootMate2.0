import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      student {
        id
      }
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation addStudent($firstName: String!, $lastName: String!, $email: String!, $password: String!, $openEmploy: Boolean, $image: String) {
    addStudent(firstName: $firstName, lastName: $lastName, email: $email, password: $password, openEmploy: $openEmploy, image: $image) {
      token
      student {
        id
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $baseLanguage: String!, $openCollab: Boolean!, $description: String!) {
    addProject(name: $name, baseLanguage: $baseLanguage, openCollab: $openCollab, description: $description) {
      id
      name
      baseLanguage
      openCollab
      description
      student {
        id
        firstName
        lastName
        email
        password
        openEmploy
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      id
      firstName
      lastName
      email
      password
      openEmploy
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($projectId: ID!, $openCollab: Boolean!, $description: String!) {
    updateProject(projectId: $projectId, openCollab: $openCollab, description: $description) {
      id
      name
      baseLanguage
      openCollab
      description
      student {
        id
        firstName
        lastName
        email
        password
        openEmploy
      }
    }
  }
`;