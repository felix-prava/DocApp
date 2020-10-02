let mongoose = require('mongoose');
//Schema
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
});
let Articlee = module.exports = mongoose.model('Articlee', articleSchema);