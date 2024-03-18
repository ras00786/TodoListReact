const Todolist = require('../models/todomodel');

const addtask = async (req, res) => {
    try {
        const { task, status, deadline } = req.body;
        console.log(task, status, deadline);
        const result = await Todolist.create({
            task: task,
            status: status,
            deadline: deadline
        });
        res.status(200).json({ message: 'Task added successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the task', error: error.message });
    }
}

const updateTask = async (req, res) => {
    const { id ,task, status, deadline } = req.body;
    console.log(id, task, status, deadline);
    try {
      const response = await Todolist.update({
        task,
        status,
        deadline,
      }, {
        where: {
          id: parseInt(id), // Ensure id is parsed to an integer
        },
      });
  
   
      res.sendStatus(200) // Task updated successfully

    } catch (error) {
      console.error("Error updating task:", error);
      res.sendStatus(500) // Internal server error
    }
  };

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todolist.destroy({
            where: {
                id: id
            }
        })
        res.sendStatus(200)
        console.log(result);
    }catch (error) {
        res.sendStatus(500)
        console.error(error);
    }
}
const getitems = async (req, res) => {
    try {
        const result = await Todolist.findAll();
        console.log(result);
        res.status(200).json({ message: 'Tasks fetched successfully', data: result });

    }catch (error) {
        res.send(500).json({ message: 'An error occurred while fetching the tasks', error: error.message });
        console.error(error);
    }
}
module.exports = {
    addtask,
    getitems,
    deleteTask,
    updateTask
};
