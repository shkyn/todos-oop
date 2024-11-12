import express, { router } from "express"
import { todoController } from "../controllers/todos.js"

const router = Router()

router.post("/new-todo", (req,res) => todoController.create)

export default router