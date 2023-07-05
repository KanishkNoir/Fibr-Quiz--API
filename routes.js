const express = require('express')
const router = express.Router()
const Question = require('./models/Question')

// creating a question
router.post('/questions', async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            description,
            alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// deleting a question
router.delete('/questions/:id', (req, res) =>{

})

//test
router.get('/', (req, res) =>{
    res.send('Hello Fibr quiz')
})

module.exports = router