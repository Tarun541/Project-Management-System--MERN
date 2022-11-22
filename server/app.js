const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const User=require('./model/userschema')


const cookieParser = require('cookie-parser')



app.use(cookieParser())

dotenv.config({ path: './config.env' });


require('./db/conn');





app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'))

app.use(require('./router/auth'));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV == 'production') {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log("connected to 3000");
})