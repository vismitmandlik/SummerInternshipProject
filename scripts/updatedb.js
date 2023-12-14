const mongoose = require("mongoose");
const {Product} = require("./models/product");

async function updateStatus() {
  try {
    // Connect to your MongoDB database
    await mongoose.connect("mongodb+srv://vismit:VismitMongodb@vismitapi.sbdfoxz.mongodb.net/VismitAPI?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Update all documents where Status is "Not Provided" to "Pending"
    const filter = { Status: "Not Provided" };
    const update = { Status: "Pending" };

    const updateResult = await Product.updateMany(filter, { $set: update });

    console.log(`${updateResult.modifiedCount} documents updated.`);
  } catch (error) {
    console.error("Error updating status:", error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

updateStatus();
