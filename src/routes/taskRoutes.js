const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authMiddleware')
const taskController = require('../controllers/taskController')

router.get('/', authenticate, taskController.getAllTasks)
router.post('/', authenticate, taskController.createTask)
router.get('/:id', authenticate, taskController.getTask)
router.put('/:id', authenticate, taskController.updateTask)
router.delete('/:id', authenticate, taskController.deleteTask)

module.exports = router