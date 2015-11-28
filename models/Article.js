var mongoose = require('mongoose');

// Create the MovieSchema.
var ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  imgurl: {
    type: String,
    required: true
  },
  rand: {
    type: Number,
    required: true
  }
});

// Export the model schema.
module.exports = ArticleSchema;