const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const redis = require('redis-promisify')

const client = redis.createClient({
  host: 'redis',
  port: 6379,
})

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const todo = await Todo.findById(id)
  res.send(todo)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const value = await client.getAsync('added_todos')
  const nextValue = value ? Number(value) + 1 : 1
  await client.setAsync('added_todos', nextValue)

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  res.send(todo)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const newTodo = await Todo.findByIdAndUpdate(
    id,
    {
      text: req.body.text,
      done: req.body.done,
    },
    { new: true }
  )
  return res.json(newTodo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405) // Implement this
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405) // Implement this
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
