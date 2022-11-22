const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        default: null

    },
    rating: {
        type: Number,
        default: null
    },
    image: {
        type: String
    },
    documentation: {
        type: String
    },
    teammember1: {
        type: String
    },
    team1email: {
        type: String,
        default: "None"

    },
    team2email: {
        type: String,
        default: "None"

    },
    team3email: {
        type: String,
        default: "None"

    },
    teammember2: {
        type: String
    },
    teammember3: {
        type: String
    }

})

const Projects = new mongoose.model('Projects', projectSchema);

module.exports = Projects;