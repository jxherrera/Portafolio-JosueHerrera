const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: [String], required: true },
    
    education: { type: String, default: '' },
    experience: { type: String, default: '' },
    certifications: { type: String, default: '' },
    languages: { type: String, default: '' },
    // ---------------------

    email: { type: String },
    github: { type: String }
});

module.exports = mongoose.model('Profile', ProfileSchema);