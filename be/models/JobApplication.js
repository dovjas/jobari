const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    link: String,
    status: {
        type: String,
        enum: ['Interested', 'Applied', 'Rejected', 'First Interview', 'Second Interview', 'Third Interview', 'Hired', 'Declined'],
        default: 'Interested'
    },
    notes: {
        type: String,
        default: ''
    },
    dateApplied: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
