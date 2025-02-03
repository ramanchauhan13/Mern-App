const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const app = express();
require('./models/db');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/ping', (req,res)=>{
    res.send("Pong");
})

app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})