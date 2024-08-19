const JobApplication = require("../models/JobApplication");

// Add a new job application
exports.createApplication = async(req, res)=>{
    const newJobApplication = new JobApplication(req.body);
    try{
        const savedJobApplication = await newJobApplication.save();
        res.status(201).json(savedJobApplication);
    }catch(error){
        res.status(500).json({error:message.error});
    };
};
// Get all job applications
exports.getApplications = async(req,res)=>{
    try{
        const jobApplications = await JobApplication.find();
        res.json(jobApplications);
    }catch(error){
        res.status(500).json({messsage: message.error});
    };
};

// Update a job application
exports.updateApplication = async(req,res)=>{
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
};

// Delete application
exports.deleteApplication = async(req,res)=>{
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
};
