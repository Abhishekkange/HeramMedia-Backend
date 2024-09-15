const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({

    profile1:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
        required:true
    },
    profile2:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
        required:true

    },
    preferredProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
        required:true  
    },
    preferredBy:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
        required:true
    }

});


const preferenceModel = new mongoose.model('preference',preferenceSchema);


module.exports = preferenceModel;