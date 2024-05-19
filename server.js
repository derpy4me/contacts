const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const mongodb = require("./utilities/database");
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

const app = express();

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(express.urlencoded({extended: true}))
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session({}))
    .use((err, req, res, nxt) => {
        if (err instanceof express.ValidationError) {
            return res.status(400).json({errors: err.array()});
        }
        next(err);
    })
    .use("/", require("./routes"));


passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out"));

app.get('/github/callback', passport.authenticate('github', {
        failureRedirect: '/api-docs', session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err) => {
    if (err) throw err;
    app.listen(port, () => console.log(`Listening on port ${port}`));
});
