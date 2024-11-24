require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db'); 
const productRoutes = require('./routes/productRoutes'); 

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/products', productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
