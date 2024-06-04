const {
  addTodoToDB,
  getTodosFromDB,
  updateTodoById,
  deleteTodoById,
} = require("../services/todo.service");
const { v4: uuidv4 } = require("uuid");

const createTodo = async (req, res) => {
  req.body.todo_id = uuidv4();

  try {
    await addTodoToDB(req.body);
    console.info("Add new todo success");
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: "Add new todo success",
    });
  } catch (error) {
    console.error("ERR: todo - create = ", error);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: error });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await getTodosFromDB();
    console.info("Get todos success");
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Get todos success",
      data: todos,
    });
  } catch (error) {
    console.error("ERR: todo - get = ", error);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: error });
  }
};

const updateTodo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const result = await updateTodoById(id, req.body);

    if (result) {
      console.log("Update todo success");
      return res.status(201).send({
        status: true,
        statusCode: 201,
        message: "Update todo success",
      });
    } else {
      console.log("Data not found");
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data not found" });
    }
  } catch (error) {
    console.error("ERR: todo - update = ", error);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: error });
  }
};

const deleteTodo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const result = await deleteTodoById(id);

    if (result) {
      console.log("Delete todo success");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete todo success",
      });
    } else {
      console.log("Data not found");
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data not found" });
    }
  } catch (error) {
    console.error("ERR: todo - delete = ", error);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: error });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
