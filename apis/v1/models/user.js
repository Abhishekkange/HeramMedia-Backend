const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{type: 'string', required: true},
    token:{type: 'string', required: true},
    timestamp: { type: Date, default: Date.now }
});

const user = new mongoose.model('user',userSchema);
module.exports = user;