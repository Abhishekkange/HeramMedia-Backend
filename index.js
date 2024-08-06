const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const PORT = 4000;
const connectToMongoose = require('./apis/v1/db/db');
connectToMongoose();

app.use(bodyparser.json());
app.use('/api/v1',require('./apis/v1/Routers/profile-routes'));
app.use('/api/v1',require('./apis/v1/Routers/feed-route'));
app.use('/api/v1',require('./apis/v1/Routers/auth-route'));
app.use('/api/v1',require('./apis/v1/Routers/match-routes'));
app.use('/api/v1',require('./apis/v1/Routers/swipe-route'));



app.listen(PORT,()=>{

  console.log('listening on port '+PORT);
})