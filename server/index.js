const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const port = process.env.port

const pathname = path.join(__dirname, '/../public')
console.log(pathname);


const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(pathname))

io.on('connection', (socket) => {
    console.log('A new user just connected');

    socket.on('createMsg', (msg) => {
        console.log(msg);

        io.emit('newMsg', {
            name: msg.from,
            text: msg.text,
            time: new Date().toLocaleTimeString()
        })
        // socket.broadcast.emit('newMsg', {
        //     name: msg.from,
        //     text: msg.text,
        //     time: new Date().toLocaleTimeString()
        // })
    })

    socket.on('disconnect', () => {
        console.log('user is disconnected');
    })
})

server.listen(port, () => console.log(`server is running on ${port}`))