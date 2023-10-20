require("dotenv").config();
const mongoose = require('mongoose'); // Import the mongoose library
const connectDB = require("./db/connect");
const Product = require("./models/product");
const ProductJson = require("./student-updated.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);

        for (const data of ProductJson) {
            // Check if a document with the same StudentID already exists
            const existingProduct = await Product.findOne({ StudentID: data.StudentID });

            if (existingProduct) {
                // A document with the same StudentID already exists
                // You can update the existing document here
                existingProduct.someField = data.someField; // Update fields as needed
                await existingProduct.save();
                console.log(`Document with StudentID ${data.StudentID} updated.`);
            } else {
                // Skip the insertion since the document already exists
                console.log(`Document with StudentID ${data.StudentID} already exists. Skipping insertion.`);
            }
        }

        console.log("Data processing completed.");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the database connection to avoid resource leaks
        await mongoose.connection.close();
    }
};

start();
