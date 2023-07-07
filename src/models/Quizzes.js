const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
  topic: String,
  questionnaire: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
  }],
});

const Quiz = mongoose.model('Quiz', QuizSchema);


module.exports = Quiz