const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

// const router = express.Router();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
const Person = mongoose.model('product', {
    productName: String,
    productCode: String,
    category: String,
    price: Number,
    description: String,
    imageURL: String,
});
app.get('/get-product', (req, res) => {
    Person.find().then((result) => res.json(result));
    // res.send(JSON.stringify(product));
});

app.post('/create-product', async (req, res) => {
    console.log('receiving data');
    console.log(req.body);
    // eslint-disable-next-line no-new
    const newperson = new Person(req.body);
    const output = await newperson.save();
    res.send(output);
    // person.push(req.body);
    // res.send(JSON.stringify(person));
});

app.put('/edit-product/:id', async (req, res) => {
    const { id } = req.params;
    const output = await Person.findByIdAndUpdate(id, req.body);
    res.send(output);
});

app.delete('/delete-product/:id', async (req, res) => {
    const { id } = req.params;
    const output = await Person.findByIdAndDelete(id);
    res.send(output);
});

const port = process.env.port || 3010;
mongoose.connect(process.env.mongoURL, () => {
    console.log('database e aslam');
    app.listen(port, () => {
        console.log('server started');
    });
});
