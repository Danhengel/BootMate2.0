const { Student, Project } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const bcrypt = require("bcrypt");
const {Types} = require('mongoose');

const resolvers = {
  Query: {
    students: async () => {
      return Student.find();
    },
    
    projects: async (parent, { student, name }) => {
      const params = {};

      if (student) {
        params.student = student;
      }

      if (name) {
        params.name = name;
      }
      return Project.find(params).populate('student');
    },

    project: async (parent, { id }) => {
      return Project.findById(id).populate('student');
    },

    student: async (parent, { id }) => {
      const objectId = new Types.ObjectId(id);
      
      return Student.findOne({ _id: objectId }).populate('projects');
    },

    me: async (parent, args, context) => {
      if (context.student) {
        return Student.findById(context.student._id).populate('projects');
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },


  Mutation: {
    addStudent: async (parent, args) => {
      const student = await Student.create(args);
      const token = signToken(student);

      return { token, student };
    },

    // Add a new project
    addProject: async (
      _,
      { name, baseLanguage, openCollab, description },
      context
    ) => {
      
      // Get the current student
      const studentId = context.studentId;
      
      // Create a new project
      const newProject = new Project({
        name,
        baseLanguage,
        openCollab,
        description,
        student: studentId,
      });
      
      // Save the project to the database
      const res = await newProject.save();

      // Add project to student's projects
      await Student.findByIdAndUpdate(
        studentId,
        { $push: { projects: res.id } },
        { new: true }
      );

      // Return the updated student
      return Student.findById(studentId).populate("projects");
    },

    // Remove a project
    removeProject: async (_, { projectId }, context) => {
      
      const studentId = context.studentId;

      // Remove the project from the database
      await Project.findByIdAndRemove(projectId);

      // Remove the project from student's projects
      await Student.findByIdAndUpdate(
        studentId,
        { $pull: { projects: projectId } },
        { new: true }
      );

      // Return the updated student
      return Student.findById(studentId).populate("projects");
    },

    // Update a project
    updateProject: async (
      _,
      { projectId, openCollab, description },
      context
    ) => {

      // Check if the user is authenticated
      if (!context.isAuth) {
        throw new Error("Unauthenticated!");
      }

      // Update the project
      return Project.findByIdAndUpdate(
        projectId,
        { openCollab, description },
        { new: true }
      );
    },

    login: async (parent, { email, password }) => {
      const user = await Student.findOne({ email });

      if (!user) {
      throw AuthenticationError;
      }

      const correctPw = await bcrypt.compare(password, user.password);

      if (!correctPw) {
      throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    },
  };

module.exports = resolvers;