const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Question = require('./models/Question')

//creating one question

router.post('/questions', async(req, res) => {
    const {description, alternatives} = req.body
	try {
		const newQuestion = await Question.create({description, alternatives});

        newQuestion.save().then(() =>{
            res.status(201).json({message: 'Question saves succesfully'})
        })
	} catch (error){
		return res.status(500).json({"error": error})
	}
})

// router.post('/questions', (req, res) => {
//     const { description, alternatives } = req.body;
  
//     const newQuestion = new Question.create({
//       description,
//       alternatives,
//     });
  
//     newQuestion.save()
//       .then(() => {
//         res.status(201).json({ message: 'Question saved successfully' });
//       })
//       .catch((error) => {
//         res.status(500).json({ error: 'Error saving question' });
//       });
//   });

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

//test
router.get('/', (req, res) =>{
    res.send('Hello Fibr quiz')
})

module.exports = router