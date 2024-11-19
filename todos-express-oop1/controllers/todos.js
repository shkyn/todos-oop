import { Todo } from "../models/todo.js";
import { fileManager } from "../utils/files.js";

class todoController {
    constructor() {
        this.initTodos()
    }


    async createTodo(req, res) {
        const task = req.body.task;
        const newTodo = new Todo(Math.random().toString(), task);
        this.TODOS.push(newTodo);
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: "Created new todo object",
            newTask: newTodo
        });
    }

    async initTodos() {
        this.TODOS = await fileManager.readFile('./data/todos.json');
    }
    
    getTodos(req, res) {
        res.json({tasks: this.TODOS});
    }

    async updateTodo(req, res) {
        const todoId = req.params.id;
        const updatedTask = req.body.task;
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
    
        if (todoIndex < 0) {
            return res.status(404).json({
                message: "Could not find todo with the given id",
            });
        }
    
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
        await fileManager.writeFile('./data/todos.json', this.TODOS); // Kirjuta värskendatud massiiv faili
    
        res.json({
            message: "Updated todo",
            updatedTask: this.TODOS[todoIndex],
        });
    }
    
    async deleteTodo(req, res) {
        const todoId = req.params.id;
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
    
        if (todoIndex < 0) {
            return res.status(404).json({
                message: "Could not find todo with the given id",
            });
        }
    
        this.TODOS.splice(todoIndex, 1); // Eemalda element massiivist
        await fileManager.writeFile('./data/todos.json', this.TODOS); // Kirjuta värskendatud massiiv faili
    
        res.json({
            message: "Deleted todo successfully",
        });
    }

}

export const TodoController = new todoController();
