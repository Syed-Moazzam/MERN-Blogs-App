const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected To MongoDB Successfully!');
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = connectToMongo;