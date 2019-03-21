
let mongoose = require('mongoose');
let contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content', contentsSchema);
