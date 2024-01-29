const fs = require('fs');
const mongoose = require('mongoose');
const { ProductModel } = require('./models');

mongoose.connect(
  'mongodb+srv://vismit:VismitMongodb@vismitapi.sbdfoxz.mongodb.net/VismitAPI?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const batchSize = 100; // Define your batch size
let processedRecords = 0;

// Update operation
const updateRecord = async (record) => {
  if (!record.Semester) {
    record.Semester = 'Not Provided';
  }
  if (!record.Duration) {
    record.Duration = 'Not Provided';
  }
  if (!record.StartDate) {
    record.StartDate = 'Not Provided';
  }
  if (!record.EndDate) {
    record.EndDate = 'Not Provided';
  }

  try {
    await ProductModel.updateOne({ StudentID: record.StudentID }, record);
    processedRecords++;
  } catch (error) {
    console.error('Error updating record:', error);
  }
};

// Function to update database in batches
const updateDatabaseBatch = async (records) => {
  for (const record of records) {
    await updateRecord(record);
  }
};

// Function to read the JSON file and update the database
const updateDatabaseFromJson = async () => {
  fs.readFile('student-updated.json', 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    const totalRecords = jsonData.length;

    while (processedRecords < totalRecords) {
      const recordsToUpdate = jsonData.slice(
        processedRecords,
        processedRecords + batchSize
      );
      await updateDatabaseBatch(recordsToUpdate);
    }

    console.log('All records updated.');
    mongoose.connection.close();
  });
};

// Call the function to update the database from the .json file
updateDatabaseFromJson();
