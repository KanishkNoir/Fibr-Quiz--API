const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const User = require('../models/User')
const Quiz = require('../models/Quizzes')

//creating one question
router.post('/questions', async (req, res) => {
    const {description, alternatives} = req.body
	try {
		const newQuestion = await Question.create({
            description,
            alternatives
        })

        newQuestion.save().then(() =>{
            res.status(201).json(newQuestion)
        })
	} catch (error){
		return res.status(500).json({"error": error})
	}
})

//get all questions
router.get('/questions', async (req,res)=>{
    try{
        const questions = await Question.find()
        return res.status(200).json(questions)
    }catch(error){
        return res.status(500).json({"error": error})
    }
})

// deleting a question
router.delete('/questions/:id', async (req, res) =>{
    try{
        const _id =req.params.id
        const question =await Question.deleteOne({_id})
    if(question.deletedCount===0){
        return res.status(404).json()
    }
    else{
        return res.status(204).json()
    }
    }catch(error){
            return res.status(500).json({"error": error})
        }
})


//creating one user
router.post('/users', async (req, res) => {
    const {name, email, password, isDeactivated, role} = req.body
	try {
		const newUser = await User.create({
            name,
            email,
            password,
            isDeactivated,
            role
        })

        newUser.save().then(() =>{
            res.status(201).json(newUser)
        })
	} catch (error){
		return res.status(500).json({"error": error})
	}
})

//get users list
router.get('/users', async (req,res)=>{
    try{
        const users = await User.find()
        return res.status(200).json(users)
    }catch(error){
        return res.status(500).json({"error": error})
    }
})

//delete user
router.delete('/users/:id', async (req, res) =>{
    try{
        const _id =req.params.id
        const user =await User.deleteOne({_id})
    if(user.deletedCount===0){
        return res.status(404).json("There are 0 users in database with this id.")
    }
    else{
        return res.status(204).json("User deleted successfuly!")
    }
    }catch(error){
            return res.status(500).json({"error": error})
        }
})

//post a quiz
router.post('/quiz', (req, res) => {
    const { topic, questionnaire } = req.body
  
    // Create an array to store the populated question documents
    const populatedQuestions = []

    // Fetch the question documents based on the provided question IDs
    Question.find({ _id: { $in: questions } })
    .then(foundQuestions => {
    
    if (foundQuestions.length !== questions.length) {
      return res.status(400).json({ error: 'Invalid question ID(s).' });
    }

    populatedQuestions.push(...foundQuestions);

    const newQuiz = new Quiz({
        topic,
        questionnaire: populatedQuestions
    })
  
    return newQuiz.save()
    })
      .then(savedQuiz => {
        res.json(savedQuiz)
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({ error: 'Failed to create quiz.' })
      })
  })


//get a quiz
router.get('/quiz/:id', (req, res) => {
    const quizId = req.params.id;
  
    Quiz.findById(id)
      .populate('questions')
      .exec((error, quiz) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to fetch quiz.' });
        }
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found.' });
        }
        res.json(quiz);
      });
  });

//delete a quiz
router.delete('/quiz/:id', async (req, res) =>{
    try{
        const _id =req.params.id
        const quiz =await Quiz.deleteOne({_id})
    if(quiz.deletedCount===0){
        return res.status(404).json("No Quiz.")
    }
    else{
        return res.status(204).json("Quiz deleted successfuly!")
    }
    }catch(error){
            return res.status(500).json({"error": error})
        }
})

module.exports = router