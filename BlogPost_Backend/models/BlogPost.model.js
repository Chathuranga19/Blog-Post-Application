const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  ID: String, // String is shorthand for {type: String}
  Title: String,
  Content: String,
  Author: String,
  Created_Date: Date
});

module.exports = BlogPost = mongoose.model('BlogPost', blogPostSchema);