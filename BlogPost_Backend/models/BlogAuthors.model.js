const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorsSchema = new Schema({
  ID: String,
  Name: String,
});

module.exports = BlogAuthors = mongoose.model('BlogAuthors', authorsSchema);