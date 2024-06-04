const todoModel = require("../models/todo.model");

const addTodoToDB = async (payload) => {
  return await todoModel.create(payload);
};

const getTodosFromDB = async () => {
  return await todoModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.info("Cannot get todos from DB");
      console.error(error);
    });
};

const updateTodoById = async (id, payload) => {
  const result = await todoModel.findOneAndUpdate(
    { todo_id: id },
    { $set: payload }
  );
  return result;
};

const deleteTodoById = async (id) => {
  const result = await todoModel.findOneAndDelete({ todo_id: id });
  return result;
};

module.exports = {
  addTodoToDB,
  getTodosFromDB,
  updateTodoById,
  deleteTodoById,
};
