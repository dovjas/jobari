import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './JobList.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [newJob, setNewJob] = useState({
    companyName: '',
    jobTitle: '',
    link: '',
    status: 'Interested',
    notes: ''
  });
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/applications`)
      .then(response => setJobs(response.data))
      .catch(error => console.log('Error fetching jobs: ', error));

    axios.get(`${API_BASE_URL}/api/applications/status`)
      .then(response => setStatusOptions(response.data))
      .catch(error => console.log('Error fetching statuses: ', error));
  }, []);

  const handleEdit = (job) => {
    setCurrentJob(job);
    setShowEdit(true);
  };

  const handleAdd = () => {
    setNewJob({
      companyName: '',
      jobTitle: '',
      link: '',
      status: 'Interested',
      notes: ''
    });
    setShowAdd(true);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseAdd = () => setShowAdd(false);

  const handleSave = () => {
    axios.put(`${API_BASE_URL}/api/applications/${currentJob._id}`, currentJob)
      .then(response => {
        const updatedJobs = jobs.map(job => job._id === currentJob._id ? response.data : job);
        setJobs(updatedJobs);
        setShowEdit(false);
      })
      .catch(error => console.log('Error updating job: ', error));
  };

  const handleSaveNew = () => {
    axios.post(`${API_BASE_URL}/api/applications`, newJob)
      .then(response => {
        setJobs([...jobs, response.data]);
        setShowAdd(false);
      })
      .catch(error => console.log('Error adding job: ', error));
  };

  const handleChangeEdit = (e) => {
    setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
  };

  const handleChangeAdd = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleDelete = (jobId) => {
    axios.delete(`${API_BASE_URL}/api/applications/${jobId}`)
      .then(() => {
        const updatedJobs = jobs.filter(job => job._id !== jobId);
        setJobs(updatedJobs);
      })
      .catch(error => console.log('Error deleting job: ', error));
  };

  return (
    <div className="container mt-5">
      <h3>Job Applications</h3>
      <Button variant="primary" onClick={handleAdd} className="mb-3">Add New Application</Button>

      {jobs.length === 0 ? (
        <div className="text-center">
          <p>No job applications found. Please add a new application.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Link</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id}>
                <td data-label="#"> {index + 1} </td>
                <td data-label="Job Title"> {job.jobTitle} </td>
                <td data-label="Company Name"> {job.companyName} </td>
                <td data-label="Link">
                  <a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a>
                </td>
                <td data-label="Status"> {job.status} </td>
                <td data-label="Notes"> {job.notes} </td>
                <td data-label="Actions">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(job)}
                    style={{ marginRight: '10px', cursor: 'pointer', color: '#007bff' }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(job._id)}
                    style={{ cursor: 'pointer', color: '#dc3545' }}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
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
                onChange={handleChangeEdit} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control 
                type="text" 
                name="companyName" 
                value={currentJob?.companyName || ''} 
                onChange={handleChangeEdit} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control 
                type="text" 
                name="link" 
                value={currentJob?.link || ''} 
                onChange={handleChangeEdit} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select 
                name="status" 
                value={currentJob?.status || ''} 
                onChange={handleChangeEdit}
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
                onChange={handleChangeEdit} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New Modal */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Job Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control 
                type="text" 
                name="jobTitle" 
                value={newJob.jobTitle} 
                onChange={handleChangeAdd} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control 
                type="text" 
                name="companyName" 
                value={newJob.companyName} 
                onChange={handleChangeAdd} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control 
                type="text" 
                name="link" 
                value={newJob.link} 
                onChange={handleChangeAdd} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select 
                name="status" 
                value={newJob.status} 
                onChange={handleChangeAdd}
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
                value={newJob.notes} 
                onChange={handleChangeAdd} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNew}>
            Save Application
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobsList;

