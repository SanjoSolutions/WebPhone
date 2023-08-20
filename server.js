const express = require('express')
const https = require('https')
const path = require('path')
const app = express()
const fs = require('fs')
const server = https.createServer(
  {
    cert: fs.readFileSync('/Users/Self/localhost.pem', { encoding: 'utf-8' }),
    key: fs.readFileSync('/Users/Self/localhost-key.pem', {
      encoding: 'utf-8',
    }),
  },
  app
)
const { ExpressPeerServer } = require('peer')
const port = process.env.PORT || 443

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: '/myapp',
  ssl: {
    cert: fs.readFileSync('/Users/Self/localhost.pem', { encoding: 'utf-8' }),
    key: fs.readFileSync('/Users/Self/localhost-key.pem', {
      encoding: 'utf-8',
    }),
  },
})

app.use(peerServer)

app.use(express.static(path.join(__dirname)))

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

server.listen(port)
console.log('Listening on: ' + port)
