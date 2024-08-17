const fs = require('fs');
const path = require('path');

// Path to the database file (db.txt)
const dbPath = path.join(__dirname, 'db.txt');

// Function to create a new todo
const createTodoSync = (title) => {
  const newTodo = {
    id: Date.now(),
    title,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const todoString = JSON.stringify(newTodo, null, 2);

  // Append the new todo to db.txt
  fs.appendFileSync(dbPath, todoString + '\n');
};

// Function to get all todos
const getTodosSync = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return data;
  } catch (err) {
    throw new Error('Error reading the todos.');
  }
};

// Function to get a specific todo by ID
const getTodoSync = (id) => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const todos = data.trim().split('\n').map(line => JSON.parse(line));
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
      throw new Error('Todo not found.');
    }

    return JSON.stringify(todo, null, 2);
  } catch (err) {
    throw new Error('Error getting the todo.');
  }
};

// Function to update a specific todo by ID
const updateTodoSync = (id, updates) => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    let todos = data.trim().split('\n').map(line => JSON.parse(line));

    let todoFound = false;
    todos = todos.map(todo => {
      if (todo.id === id) {
        todoFound = true;
        return {
          ...todo,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return todo;
    });

    if (!todoFound) {
      throw new Error('Todo not found.');
    }

    // Write updated todos back to db.txt
    fs.writeFileSync(dbPath, todos.map(todo => JSON.stringify(todo, null, 2)).join('\n') + '\n');
  } catch (err) {
    throw new Error('Error updating the todo.');
  }
};

// Function to delete a specific todo by ID
const deleteTodoSync = (id) => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const todos = data.trim().split('\n').map(line => JSON.parse(line));
    const filteredTodos = todos.filter(todo => todo.id !== id);

    if (todos.length === filteredTodos.length) {
      throw new Error('Todo not found.');
    }

    // Write updated todos back to db.txt
    fs.writeFileSync(dbPath, filteredTodos.map(todo => JSON.stringify(todo, null, 2)).join('\n') + '\n');
  } catch (err) {
    throw new Error('Error deleting the todo.');
  }
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
