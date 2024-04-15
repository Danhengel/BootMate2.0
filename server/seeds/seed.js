const db = require('../config/connection');
const { Project, Student } = require('../models');
const projectSeeds = require('./projectSeeds.json');
const studentSeeds = require('./studentSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean the Project and Student collections
    await cleanDB('Project', 'projects');
    await cleanDB('Student', 'students');

    // Seed the Student collection first since Project references Student
    await Student.create(studentSeeds);

    // Seed the Project collection
    await Project.create(projectSeeds);

    console.log('All done! Data has been successfully seeded.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed data:', err);
    process.exit(1);
  }
});