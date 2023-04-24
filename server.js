require("dotenv").config()
const es6Renderer = require("express-es6-template-engine")
const cookieParser = require("cookie-parser")
const express = require("express")
const sessions = require("express-session")

const { checkAuth } = require("./middleware")
const { setMainView, setNavs } = require("./utils")
const navs = require("./data/navs.json")

const server = express()
const PORT = process.env.PORT || 8080
const SECRET = process.env.SECRET

server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

server.use(express.static(__dirname + '/public'))
server.use(express.json())
server.use(cookieParser())
server.use(sessions({
    secret: SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
    resave: false
}))

const validCreds = {
    password: "1234",
    username: "John"
}

server.get("/", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs, !!req.session.userId),
        partials: setMainView("landing")
    })
})

server.get("/about", (req, res) => {
    console.log("pota", req.url)
    res.render("index", {
        locals: setNavs(req.url, navs, !!req.session.userId),
        partials: setMainView("about")
    })
})

server.get("/contact-us", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs, !!req.session.userId),
        partials: setMainView("contact-us")
    })
})

server.get("/gallery", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs, !!req.session.userId),
        partials: setMainView("gallery")
    })
})

server.get("/login", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs, !!req.session.userId),
        partials: setMainView("login")
    })
})

server.post("/login", (req, res) => {
    const afterLogin = {
        isAuthenticated: false,
        redirectTo: "/login"
    };

    const { password, username } = req.body;
    if(password === validCreds.password && username === validCreds.username){
        req.session.userId = username;
        afterLogin.isAuthenticated = true;
        afterLogin.redirectTo = "/profile";
    }
    res.json(afterLogin)
})

server.get("/logout", (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs, !!req.session.userId),
        partials: setMainView("logout")
    })
})

server.get("/profile", checkAuth, (req, res) => {
    res.render("index", {
        locals: setNavs(req.url, navs, !!req.session.userId),
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

