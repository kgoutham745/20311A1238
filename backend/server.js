const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const trains_url = 'http://104.211.219.98/train/trains';
const train_url = 'http://104.211.219.98/train/trains/';
const auth_url = 'http://104.211.219.98/train/auth';

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//get all trains
app.get('/trains', (req, res) => {
    const data = {
        "companyName": "Train Master",
        "clientID": process.env.clientID,
        "clientSecret": process.env.clientSecret,
        "ownerName": "Goutham Kumar",
        "ownerEmail": "20311a1238@sreenidhi.edu.in",
        "rollNo": "20311A1238"
    };
    axios.post(auth_url, data)
        .then(response => {
            const token = response.data.access_token;
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios.get(trains_url, { headers })
                .then(respons => {
                    res.json(respons.data);
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            res.send({"messsage":"server error!"});
        });
});

//get individual train details
app.get('/trains/:id', (req, res) => {
    const data = {
        "companyName": "Train Master",
        "clientID": process.env.clientID,
        "clientSecret": process.env.clientSecret,
        "ownerName": "Goutham Kumar",
        "ownerEmail": "20311a1238@sreenidhi.edu.in",
        "rollNo": "20311A1238"
    };
    const train_id = req.params.id;
    axios.post(auth_url, data)
        .then(response => {
            const token = response.data.access_token;
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios.get(train_url+train_id, { headers })
                .then(respons => {
                    res.json(respons.data);
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            res.send({"messsage":"server error!"});
        });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
