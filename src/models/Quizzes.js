const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
  topic: String,
  
  questionnaire: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    description: {
      type: String,
      required: true
    },
    alternatives: [{
      text: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        default: false
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId
      }
    }]
  }]
})

const Quiz = mongoose.model('Quiz', QuizSchema);


module.exports = Quiz