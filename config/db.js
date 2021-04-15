const mongoose = require('mongoose');

connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    });

    console.log("Mongo DB Connected")
}

module.exports = connectDB