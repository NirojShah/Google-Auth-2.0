const express = require("express")
const session = require("express-session");
const passport = require("passport");
require("./passport")


let app = express()

app.set("view engine", "ejs")



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/home", (req, res) => {
    res.render("home")
})

app.use("/google", passport.authenticate('google', {
    scope: ['profile','email']
}));

app.get('/google/redirect',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect:'/home'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        // res.redirect('/home');
        console.log("corona")
    });


app.get("/google/logout",(req,res)=>{
    req.logOut();
    res.redirect("/")
})

module.exports = app