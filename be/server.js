const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
connectDb();

// Routes
const applicationRoute = require('./routes/jobApplications');
app.use('/api/applications', applicationRoute);



// Start the server
app.listen(PORT,()=>{
    console.log('Server is running on PORT: ', PORT);
});
