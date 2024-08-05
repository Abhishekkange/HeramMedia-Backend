const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const PORT = 4000;
const connectToMongoose = require('./apis/v1/db/db');
connectToMongoose();

app.use(bodyparser.json());

app.use('/api/v1',require('./apis/v1/Routers/profile-routes'))




app.listen(PORT,()=>{

  console.log('listening on port '+PORT);
})