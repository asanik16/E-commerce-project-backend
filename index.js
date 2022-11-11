const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
const person = mongoose.model('product', {
    productName: String,
    productCode: String,
    category: String,
    price: Number,
    description: String,
    imageURL: String,
});
app.get('/api', (req, res) => {
    person.find().then((result) => res.json(result));
    // const rashed = person.create({
    //     productName: 'goza rashed',
    //     productCode: 'gr',
    //     category: 'String',
    //     price: 100,
    //     description: 'String',
    //     imageURL: 'String',
    // });
    // rashed.save();
    // res.send('hello');
});
const port = process.env.port || 3010;
mongoose.connect(process.env.mongoURL, () => {
    console.log('database e aslam');
    app.listen(port, () => {
        console.log('server started');
    });
});
