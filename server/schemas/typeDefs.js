const typeDefs = `
type Student {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  openEmploy: Boolean!
  image: String
  projects: [Project]
}

type Project {
  id: ID!
  name: String!
  baseLanguage: String!
  openCollab: Boolean!
  description: String!
  student: Student
}

type Auth {
  token: ID!
  student: Student
}

  type Query {
    student(id: ID!, firstname: String lastname: String): Student
    students: [Student]
    project(id: ID!, name: String): Project
    projects: [Project]
    me: Student
  }

  type Mutation {
    addStudent(firstName: String!, lastName: String!, email: String!, password: String!, openEmploy: Boolean, image: String): Auth
    addProject(name: String!, baseLanguage: String!, openCollab: Boolean!, description: String!): Project
    removeProject(projectId: ID!): Student
    updateProject(projectId: ID!, openCollab: Boolean!, description: String! ): Project
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;