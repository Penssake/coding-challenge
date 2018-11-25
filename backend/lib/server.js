'use strict'

const cors = require('cors')
const express = require('express')
const jsonParser = require('body-parser').json()
const githubRouter = require('../routes/github-router.js')

const app = express()
let serverOn = null

app.use(jsonParser)

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.use(githubRouter)

module.exports = {
  start: () => {
    return new Promise((resolve, reject) => {
      if (serverOn)
        return reject(new Error('__SERVER_ERROR__ server is already on'))
      serverOn = app.listen(process.env.PORT, () => {
        console.log('__SERVER_ON__', process.env.PORT)
        return resolve()
      })
    })
  },
  stop: () => {
    return new Promise((resolve, reject) => {
      if (!serverOn)
        return reject(new Error('__SERVER_ERROR__ server is already off'))
      serverOn.close(() => {
        serverOn = null
        console.log('__SERVER_OFF__')
        return resolve()
      })
    })
  },
}