const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const studentsPath = path.join(__dirname, 'Students.json');

app.get('/', (req, res) => {
  res.send('Hello! This is my first Express application.');
});

app.get('/about', (req, res) => {
  res.send('This is a basic Express application.');
});

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.json(req.params);
});

app.get('/GetStudents', (req, res) => {
  fs.readFile(studentsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: false, message: 'Error reading Students.json' });
    }
    try {
      return res.status(200).json({
        status: true,
        statusCode: 200,
        requestedAt: new Date().toISOString(),
        requestUrl: req.originalUrl,
        requestMethod: req.method,
        studentData: JSON.parse(data)
      });
    } catch (parseError) {
      return res.status(500).json({ status: false, message: 'Students.json contains invalid JSON' });
    }
  });
});

app.get('/GetStudent/:id', (req, res) => {
  fs.readFile(studentsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: false, message: 'Error reading Students.json' });
    }
    try {
      const students = JSON.parse(data);
      const student = students['Student' + req.params.id];
      if (!student) {
        return res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Student Not Found',
          requestedAt: new Date().toISOString(),
          requestUrl: req.originalUrl,
          requestMethod: req.method
        });
      }
      return res.status(200).json(student);
    } catch (parseError) {
      return res.status(500).json({ status: false, message: 'Students.json contains invalid JSON' });
    }
  });
});

app.get('/studentinfo', (req, res) => {
  res.sendFile(path.join(__dirname, 'StudentInfo.html'));
});

app.post('/submit-data', (req, res) => {
  const { firstName = '', lastName = '', myAge = '', gender = '', Qual = [] } = req.body;
  const qualifications = Array.isArray(Qual) ? Qual : [Qual];
  res.json({
    status: true,
    message: 'Form Details',
    data: {
      name: (firstName + ' ' + lastName).trim(),
      age: myAge,
      gender,
      qualification: qualifications
    }
  });
});

app.get('/Showform', (req, res) => {
  res.sendFile(path.join(__dirname, 'PersonForm.html'));
});

// MongoDB-dependent routes are loaded only when a MONGO_URI is configured.
let db;
let dbReady = false;

async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set. JSON and HTML routes will work; MongoDB routes will return 503.');
    return;
  }
  try {
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URI);
    const { createCrudFunctions } = require('./Week4Lab');
    db = createCrudFunctions(mongoose);
    dbReady = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

function requireDatabase(req, res, next) {
  if (!dbReady || !db) {
    return res.status(503).json({
      status: false,
      message: 'MongoDB is not connected. Configure MONGO_URI in your local .env file.'
    });
  }
  next();
}

app.post('/insertOne', requireDatabase, async (req, res) => {
  try {
    const { name, age, gender, salary } = req.body;
    if (!name || age === undefined || !gender || salary === undefined) {
      return res.status(400).json({ status: false, message: 'name, age, gender and salary are required.' });
    }
    const result = await db.insertOne(name, age, gender, salary);
    return res.status(201).json({ status: true, message: 'Person inserted successfully', data: result });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/persons', requireDatabase, async (req, res) => {
  try {
    const result = await db.findAll();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.post('/insertMany', requireDatabase, async (req, res) => {
  try {
    if (!Array.isArray(req.body.persons) || req.body.persons.length === 0) {
      return res.status(400).json({ status: false, message: 'Send a non-empty persons array.' });
    }
    const result = await db.insertMany(req.body.persons);
    return res.status(201).json({ status: true, message: 'People inserted successfully', data: result });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/findFemalesOver30', requireDatabase, async (req, res) => {
  try {
    return res.json(await db.findFemalesOver30());
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/countDocuments', requireDatabase, async (req, res) => {
  try {
    return res.json({ count: await db.countDocuments() });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.patch('/updateManyPersons', requireDatabase, async (req, res) => {
  try {
    const { filter, update } = req.body;
    if (!filter || !update) {
      return res.status(400).json({ status: false, message: 'Provide filter and update objects.' });
    }
    return res.json(await db.updateManyPersons(filter, update));
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.delete('/deleteManyPersons', requireDatabase, async (req, res) => {
  try {
    const { filter } = req.body;
    if (!filter || Object.keys(filter).length === 0) {
      return res.status(400).json({ status: false, message: 'Provide a non-empty filter so records are not deleted accidentally.' });
    }
    return res.json(await db.deleteManyPersons(filter));
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase();
});
