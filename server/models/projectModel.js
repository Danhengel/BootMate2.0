const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    baseLanguage: {
        type: String,
        required: true,
        trim: true
    },
    openCollab: {
        type: Boolean,
        default: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;