const express = require('express')
const {getLeaves,
    getLeave,
    createLeave,
    deleteLeave,
    updateLeave
 }= require('../controllers/leaveController')


const router = express.Router()

//GET all leaves
router.get('/',getLeaves)

//Get a single leave
router.get('/:id',getLeave)

//create a single leave
router.post('/', createLeave)

//delete a single leave
router.delete('/:id',deleteLeave)

//update a single leave
router.patch('/:id',updateLeave)


module.exports = router