const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const resourceSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }
});

module.exports = mongoose.model('Resource', resourceSchema);