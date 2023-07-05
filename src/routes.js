const express = require('express')
const router = express.Router()


// creating a question
router.post('/questions', (req, res) =>{

})

// deleting a question
router.delete('/questions/:id', (req, res) =>{

})

//test
router.get('/', (req, res) =>{
    res.send('Hello Fibr')
})

module.exports = router