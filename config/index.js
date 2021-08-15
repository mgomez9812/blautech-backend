const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('asdfdsa ',process.env.URL_CONNECTION)
    const url = `${process.env.URL_CONNECTION}`;
    const conn = await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
}


module.exports = connectDB;