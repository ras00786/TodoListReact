//todoList.js

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todolist', 'root', 'shaik@786', {
  host: 'localhost',
  dialect: 'mysql'
});

const TodoList = sequelize.define('TodoList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Completed', 'Ongoing', 'Pending'),
    allowNull: false,
    defaultValue: 'Pending' 
  },
  deadline: {
    type: DataTypes.DATE
  }
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = TodoList;
