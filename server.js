require("dotenv").config();
const express = require("express");
const cors = require("cors");
const livrosRoutes = require('./routes/livrosRoutes')
const userRoutes = require('./routes/userRoutes')


const app = express();
const port = 5000;
app.use(express.json());

app.use(cors()); //Permitir requisições de origens diferentes (CORS)


app.use('/livros', livrosRoutes);
app.use('/auth', userRoutes);


app.listen(port);
