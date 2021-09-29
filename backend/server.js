const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
  );
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
  );

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const radiologyRouter = require('./routes/radiology');
const transportRouter = require('./routes/transport');
const radiologyCostRouter = require('./routes/radiologyCost');

app.use('/radiology', radiologyRouter);
app.use('/transport', transportRouter);
app.use('/radiologyCost', radiologyCostRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});