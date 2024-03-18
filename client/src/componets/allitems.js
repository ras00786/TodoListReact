import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './allitems.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null); // State to manage the todo being edited
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessdelete, setShowSuccessdelete] = useState(false); // State to manage the visibility of the success modal


  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3010/api/getitems');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      console.log('Fetched todos:', data.data); // Log todos data
      setTodos(data.data); // Update todos state with the array of todos
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
  
    fetchTodos();
  }, [showSuccessMessage,showSuccessdelete]);
  

  // Check if todos is an array before rendering
  if (!Array.isArray(todos)) {
    console.error('Todos is not an array:', todos);
    return null; // Return null or a loading indicator
  }

  const handleEdit = (todo) => {
    console.log('Editing todo:', todo);
    setEditTodo(todo);
  };


  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:3010/api/deletetask/${id}`);
      console.log('Todo deleted successfully:', response.data);
      if (response.status === 200) {
        console.log('Todo deleted successfully');
        setShowSuccessdelete(true);
        setTimeout(() => setShowSuccessdelete(false), 5000); // Hide message after 5 seconds
  
        // Refetch todos after successful deletion
        const updatedTodos = await fetchTodos();
        setTodos(updatedTodos);
  
        // Close the edit pop-up if open
        setEditTodo(null);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  
  

  const toggleSuccessMessage = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide message after 5 seconds
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.task}</td>
              <td>{todo.status}</td>
              <td>{new Date(todo.deadline).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editTodo && <EditTodo todo={editTodo} onCancel={() => setEditTodo(null)} onSuccess={toggleSuccessMessage} />}
      {showSuccessMessage && <div className="notification">Task updated successfully!</div>}
      {showSuccessdelete && <div className="notification">Task deleted successfully!</div>} 
    </div>
  );
}

function EditTodo({ todo, onCancel, onSuccess }) {
  const [editedTodo, setEditedTodo] = useState({
    id: todo.id,
    task: todo.task,
    status: todo.status,
    deadline: todo.deadline,
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  console.log(name, value);

  if (name === 'deadline') {
    // Parse the datetime value
    const datetime = new Date(value);
    
    // Get the day, month, and year
    const day = datetime.getDate().toString().padStart(2, '0');
    const month = (datetime.getMonth() + 1).toString().padStart(2, '0');
    const year = datetime.getFullYear();

    // Format the deadline
    const formattedDeadline = `${day}-${month}-${year}`;

    setEditedTodo(prevState => ({
      ...prevState,
      [name]: formattedDeadline
    }));
  } else {
    setEditedTodo(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
};

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:3010/api/updatetask",
        editedTodo
      );
      console.log("Task updated successfully:", response.data);
      if(response.status == 200){
        onSuccess();
      }
       // Show success message
      onCancel(); // Close the edit pop-up
    } catch (error) {
      console.error("Error updating task:", error);
      onCancel();
    }
  };

  return (
    <div className="edit-popup">
      <form onSubmit={handleSubmit}>
        <h4>Edit Task</h4>
        <label>Task</label>
        <input type="text" name="task" value={editedTodo.task} onChange={handleChange} />
        <label>Status</label>
        <select name="status" value={editedTodo.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
        </select>
        <label>Deadline</label>
        <input type="datetime-local" name="deadline" value={editedTodo.deadline} onChange={handleChange} />
        <div className="edit-popup-buttons">
          <button type="submit">Update Task</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TodoList;
