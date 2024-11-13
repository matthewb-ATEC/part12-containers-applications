const express = require('express')
const router = express.Router()
const redis = require('redis-promisify')

const client = redis.createClient()

router.get('/', async (_, res) => {
  const value = await client.getAsync('added_todos')
  if (value) {
    res.send(value)
  } else {
    await client.setAsync('added_todos', 0)
    res.send(0)
  }
})

module.exports = router