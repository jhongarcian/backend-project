require("dotenv").config()
const es6Renderer = require("express-es6-template-engine")
const { setMainView, setNavs } = require("./utils")
const express = require("express")
const navs = require("./data/navs.json")


const server = express()
const PORT = process.env.PORT || 8080

server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public'))

server.get("/", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs),
        partials: setMainView("landing")
    })
})

server.get("/about", (req, res) => {
    console.log("pota", req.url)
    res.render("index", {
        locals: setNavs(req.url, navs),
        partials: setMainView("about")
    })
})

server.get("/contact-us", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs),
        partials: setMainView("contact-us")
    })
})

server.get("/gallery", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs),
        partials: setMainView("gallery")
    })
})

server.get("/login", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs),
        partials: setMainView("login")
    })
})

server.get("/logout", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs),
        partials: setMainView("logout")
    })
})

server.get("/profile", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs),
        partials: setMainView("profile")
    })
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

