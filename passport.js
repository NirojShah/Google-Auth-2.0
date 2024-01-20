const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")

const userGoogleModel = require("./Models/User")

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    let user = await userGoogleModel.findById(id)
    done(null, user)
})


passport.use(new GoogleStrategy({
    callbackURL: "http://localhost:5000/home",
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (request, acessToken, refreshToken, profile, done) => {
    let currentUser = await userGoogleModel.findOne({
        googleId: profile.id
    })
    if (currentUser) {
        console.log(`currentuser:`, currentUser);
        done(null, currentUser)
    } else {
        let newUser = await userGoogleModel.create({
            username: profile.displayName,
            googleId: profile.id
        })
        done(null, newUser)
    }
}))