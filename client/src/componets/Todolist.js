import React, { useState } from "react";
import axios from "axios";
import "./Todolist.css";
import image from "../todo.gif";
function Todo() {
  const [task, setTask] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Prevent default form submission behavior

    // Create a task object with the form data
    const newTask = {
      task: task,
      deadline: newDeadline,
    };

    try {
      // Send a POST request to the server to add the task
      const response = await axios.post(
        "http://localhost:3010/api/addtask",
        newTask
      );

      // Clear the form inputs after successful submission
      setTask("");
      setNewDeadline("");

      // Show success notification for 5 seconds
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center  vh-100" style={{backgroundColor:"#fbfbfb"}}>
       <img
        src={image}
        alt="Task Management Tips"
        className="img-fluid"
        style={{ maxWidth: "100%", height: "80%" }}
      />
      <div className="container w-50">
      <h1 className="">Add Task</h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Task</label>
            <br />
            <input
              type="text"
              placeholder="Add Task"
              name="task"
              className="form-control rounded-5"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Deadline</label>
            <br />
            <input
              className="form-control rounded-0"
              type="datetime-local"
              placeholder="Deadline"
              name="deadline"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success btn-sm">
            Add Task
          </button>
        </form>
      </div>
      {showSuccessNotification && (
        <div className="notification">Task added successfully!</div>
      )}
    </div>
  );
}

export default Todo;
