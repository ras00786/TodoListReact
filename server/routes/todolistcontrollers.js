const express = require('express');
const router = express.Router();
const { addtask, getitems , deleteTask , updateTask} = require('../controllers/todolist'); // Adjust the path as needed

router.post('/addtask', addtask);
router.get('/getitems', getitems);
router.patch('/updatetask', updateTask);
router.delete('/deletetask/:id', deleteTask);

module.exports = router;
