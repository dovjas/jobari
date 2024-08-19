const express = require('express');
const router = express.Router();
const jobApplicationsControll = require('../controllers/jobAppliationsControll');

//Routes
router.post('/', jobApplicationsControll.createApplication);
router.get('/',jobApplicationsControll.getApplications);
router.put('/:id',jobApplicationsControll.updateApplication);
router.delete('/:id',jobApplicationsControll.deleteApplication);

module.exports = router;