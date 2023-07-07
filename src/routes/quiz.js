const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const User = require('../models/User')

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

//get a quiz

//delete a quiz

module.exports = router