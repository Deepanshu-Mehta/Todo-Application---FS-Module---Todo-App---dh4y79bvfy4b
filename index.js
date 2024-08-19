const fs = require('fs');

const convertToJson = (data) => {
  data = data.split("}\n{");
  data = data.join("},\n{");
  data = "[" + data + "]";
  data = JSON.parse(data);
  return data;
}

const getTodosSync = () => fs.readFileSync('db.txt', 'utf-8');

const getTodoSync = (id) => {
  let data = fs.readFileSync('db.txt', 'utf-8');
  data = convertToJson(data);
  for (let i of data) {
    if (i.id === id) {
      return JSON.stringify(i);
    }
  }
};

const createTodoSync = (todo) => {
  const data = {
    id: Date.now(),
    title: todo,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  fs.appendFileSync('db.txt', `${JSON.stringify(data, null, 2)}\n`);
};

const updateTodoSync = (id, updates) => {
  let data = fs.readFileSync('db.txt', 'utf-8');
  data = convertToJson(data);
  for (let i in data) {
    if (data[i].id === id) {
      for (let j of Object.keys(updates)) {
        data[i][j] = updates[j];
      }
      data[i].updatedAt = new Date().toISOString();
    }
    if (i == 0) {
      fs.writeFileSync('db.txt', `${JSON.stringify(data[i], null, 2)}\n`);
    } else {
      fs.appendFileSync('db.txt', `${JSON.stringify(data[i], null, 2)}\n`);
    }
  }
};

const deleteTodoSync = (id) => {
  let data = fs.readFileSync('db.txt', 'utf-8');
  data = convertToJson(data);
  const filteredData = data.filter(todo => todo.id !== id);
  fs.writeFileSync('db.txt', '');
  for (let i of filteredData) {
    fs.appendFileSync('db.txt', `${JSON.stringify(i, null, 2)}\n`);
  }
};

const getTodos = () => {};

const getTodo = (id) => {};

const createTodo = (todo) => {};

const updateTodo = async (id, updates) => {};

const deleteTodo = async (id) => {};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
};