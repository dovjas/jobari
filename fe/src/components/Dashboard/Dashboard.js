import React from 'react';
import './Dashboard.css';
import JobsList from "./JobList";

const Dashboard = () => {
    return(
        <div className="dashboard-container">
            <h2>Your Job Applications</h2>
            <JobsList />
        </div>
    );
};

export default Dashboard;
