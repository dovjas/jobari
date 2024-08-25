const express = require('express');
const router = express.Router();
const jobApplicationsControll = require('../controllers/jobAppliationsControll');

//Routes
router.post('/', jobApplicationsControll.createApplication);
router.get('/',jobApplicationsControll.getApplications);
router.get('/status', jobApplicationsControll.applicationsStatus);
router.get('/:id',jobApplicationsControll.getApplicationById);
router.put('/:id',jobApplicationsControll.updateApplication);
router.delete('/:id',jobApplicationsControll.deleteApplication);

module.exports = router;