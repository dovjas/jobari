const express = require('express');
const JobApplication = require("../models/JobApplication");
const router = express.Router();

// Add a new job application
router.post('/', async(req,res)=>{
    const newJobApplication = new JobApplication(req.body);
    try{
        const savedJobApplication = await newJobApplication.save();
        res.status(201).json(savedJobApplication);
    }catch(error){
        res.status(500).json({error:message.error});
    };
});
// Get all job applications
router.get('/', async(req,res)=>{
    try{
        const jobApplications = await JobApplication.find();
        res.json(jobApplications);
    }catch(error){
        res.status(500).json({messsage: message.error});
    };
});

module.exports = router;

// Update a job application
router.put('/:id', async(req,res)=>{
    try{
        const updateApplication = await JobApplication.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updateApplication){
            return res.status(404).json({ message: 'Application not found' });
        };
        res.json(updateApplication);
    }catch(error){
        res.status(500).json({ message: error.message });
    };
});

// Delete application
router.delete('/:id', async(req,res)=>{
    try{
        const deleteApplication = await JobApplication.findByIdAndDelete(
            req.params.id,
        );
        if(!deleteApplication){
            return res.status(404).json('Application not found')
        };
        res.json({ message: 'Application deleted successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });
    };
});