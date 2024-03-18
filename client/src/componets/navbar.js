import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(0 96 126)' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: 'white' }}>Todo App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/" style={{ color: 'white' }}>Add Task</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/allitems" style={{ color: 'white' }}>Todo List</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
