const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');
const { createProxyMiddleware } = require('http-proxy-middleware');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
connectDb();

// Routes
const applicationRoute = require('./routes/jobApplications');
app.use('/api/applications', applicationRoute);


// Start the server
app.listen(PORT,()=>{
    console.log('Server is running on PORT: ', PORT);
});
