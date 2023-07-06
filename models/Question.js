const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  description: String,
  alternatives: [{
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
  }],
});

const Question = mongoose.model('Question', QuestionSchema);


module.exports = Question