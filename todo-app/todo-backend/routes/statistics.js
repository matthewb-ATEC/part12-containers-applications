const express = require('express')
const router = express.Router()
const redis = require('redis-promisify')

const client = redis.createClient({
  host: 'redis',
  port: 6379,
})

router.get('/', async (_, res) => {
  const value = await client.getAsync('added_todos')
  if (value) {
    res.send(value)
  } else {
    await client.setAsync('added_todos', 0)
    res.send(value)
  }
})

module.exports = router
