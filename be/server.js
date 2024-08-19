const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const applicationRoute = require('./routes/jobApplications');
app.use('/api/applications', applicationRoute);
app.use('/api/applications/:id', applicationRoute);


// Start the server
app.listen(PORT,()=>{
    console.log('Server is running on PORT: ', PORT);
});
