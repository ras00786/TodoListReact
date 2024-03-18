import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './componets/navbar';
import Todo from './componets/Todolist';
import TodoList from './componets/allitems';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/allitems" element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
