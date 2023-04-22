require("dotenv").config()
const es6Renderer = require("express-es6-template-engine")
const express = require("express")


const server = express()
const PORT = process.env.PORT || 8080

server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public'))

server.get("/", (req, res) => {
    res.render("index")
})

server.get("/heartbeat", (req, res) => {
    res.json({
        "is" : "working",
        "status" : "good"
    })
})

server.listen(PORT, () => {
    console.log(`The server is running at PORT ${PORT}`)
})

