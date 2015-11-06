var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

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
  }
});

ArticleSchema.plugin(random);

Article = mongoose.model('Article', ArticleSchema);

Article.getRandomTen = function() {
  Article.findRandom({}, {}, {limit: 10}, function(err, results) {
    if (!err) {
      console.log(results); // 5 elements 
    }
  });
}


// Export the model schema.
module.exports = ArticleSchema;