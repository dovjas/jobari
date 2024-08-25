import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Button, Modal, Form } from "react-bootstrap";

import './JobList.css';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    // Fetch jobs
    axios.get(`${API_BASE_URL}/api/applications`)
      .then(response => setJobs(response.data))
      .catch(error => console.log('Error fetching jobs: ', error));

    // Fetch status options
    axios.get(`${API_BASE_URL}/api/applications/status`)
      .then(response => setStatusOptions(response.data))
      .catch(error => console.log('Error fetching statuses: ', error));
  }, []);

  const handleEdit = (job) => {
    setCurrentJob(job);
    setShow(true);
  };

  const handleDelete = (id) =>{
    if(window.confirm('Are you sure you want to delete this job application?')){
      axios.delete(`${API_BASE_URL}/api/applications/${id}`)
      .then(()=>{
        setJobs(jobs.filter(job => job._id !== id));
      })
      .catch(error => console.log('Error deleting job',error));
    }
  };

  const handleClose = () => setShow(false);

  const handleSave = () => {
    axios.put(`${API_BASE_URL}/api/applications/${currentJob._id}`, currentJob)
      .then(response => {
        const updatedJobs = jobs.map(job => job._id === currentJob._id ? response.data : job);
        setJobs(updatedJobs);
        setShow(false);
      })
      .catch(error => console.log('Error updating job: ', error));
  };

  const handleChange = (e) => {
    setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h3>Job Applications</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job._id}>
              <td>{index + 1}</td>
              <td>{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.status}</td>
              <td>{job.notes}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(job)}>Edit</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(job._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control 
                type="text" 
                name="jobTitle" 
                value={currentJob?.jobTitle || ''} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control 
                type="text" 
                name="companyName" 
                value={currentJob?.companyName || ''} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select 
                name="status" 
                value={currentJob?.status || ''} 
                onChange={handleChange}
              >
                {statusOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control 
                type="text" 
                name="notes" 
                value={currentJob?.notes || ''} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobsList;
