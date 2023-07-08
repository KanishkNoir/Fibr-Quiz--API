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
    const _id =req.params.id
    try {
        const deletedUser = await User.findByIdAndRemove(_id);
    
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found.' })
        }
    
        res.json({ message: 'User deleted successfully.' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete user.' })
      }
    })

//post a quiz
router.post('/quiz', (req, res) => {
    const { topic, questionnaire } = req.body

    // Fetch the question documents based on the provided question IDs
    Question.find({ _id: { $in: questionnaire } })
    .then(foundQuestions => {
    
    if (foundQuestions.length !== questionnaire.length) {
      return res.status(400).json({ error: 'Invalid question ID(s).' })
    }

    const newQuiz = new Quiz({
        topic,
        questionnaire: foundQuestions
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


//get a quiz by id
  router.get('/quiz/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const quiz = await Quiz.findById(id).populate('questionnaire._id');
  
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found.' });
      }
  
      res.json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve quiz.' });
    }
  });
  
  //get all quiz
  router.get('/quiz', async (req,res)=>{
    try{
        const quizzes = await Quiz.find()
        return res.status(200).json(quizzes)
    }catch(error){
        return res.status(500).json({"error": error})
    }
})

//delete a quiz
router.delete('/quiz/:quizId', async (req, res) => {
    const quizId = req.params.quizId
  
    try {
      const deletedQuiz = await Quiz.findByIdAndRemove(quizId)
  
      if (!deletedQuiz) {
        return res.status(404).json({ error: 'Quiz not found.' })
      }
  
      res.json({ message: 'Quiz deleted successfully.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to delete quiz.' })
    }
  })


module.exports = router