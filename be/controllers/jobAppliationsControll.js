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
        res.status(500).json({messsage: error.message});
    };
}; 
// Get application by ID
exports.getApplicationById = async(req,res)=>{
    try{
        const jobApplication = await JobApplication.findById(req.params.id);
        if(!jobApplication){
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(jobApplication);
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
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
//Get application status
exports.applicationsStatus = async(req,res)=>{
        const status = await JobApplication.schema.path('status').enumValues;
        res.json(status);
}
