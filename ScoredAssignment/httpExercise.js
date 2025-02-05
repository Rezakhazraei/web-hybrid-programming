const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// FOR DEMO ONLY, DO NOT USE IN PRODUCTION  
const MYSECRETJWTKEY = 'mysecret';
// we use the refresh secret to generate a new token for extending the session
const REFRESHSECRETJWTKEY = 'myrefreshsecret';

// We have to define the user data
// Users have roles, and we will use this to demonstrate role-based access control
const users = [
    { id: 1, username: 'JohnDoe', password: 'johnDoe123', role: 'admin' },
    { id: 2, username: 'JaneDoe', password: 'janeDoe123', role: 'user' }
]

// This is a mock posts data
const posts = ["early bird catches the worm"];

// we have to define the refresh tokens storage
const refreshTokens = [];

const optionsForJwtValidation = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: MYSECRETJWTKEY
}

// Basic Authentication Strategy
passport.use(new BasicStrategy(function(username, password, done) {
    // In a real application, we would use the username
    // and password to search our user data
    // const usernameAndPasswordCorrect = true;

    // if(usernameAndPasswordCorrect){
    //  done(null, {
    //      foo: 'bar'
    //  });
    // }
    // else {
    //     done(null, false);
    // }
    const user = users.find(user => user.username === username && user.password === password);
    if(user) {
        done(null, user);
    } else {
        done(null, false);
    }
    
}));

// JWT Authentication Strategy
passport.use(new jwtStrategy(optionsForJwtValidation, function(payload, done) {
    // What are we going to do with the payload?
    // console.log(payload);
    // done(null, true);
    const user = users.find(user => user.id === payload.id);
    if(user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));

// Middleware to check if the user has the admin role
const isAdmin = (req, res, next) => {
    if(req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send({ message: 'Forbidden: Admin access required' });
    }
}

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// The signin route generates both an access token and a refresh token
app.post('/signin',
    passport.authenticate('basic', { session: false }),
    (req,res) => {
        // Create JWT and send it in the response
        // const token = jwt.sign({ foo: 'bar' }, 'mysecret');
        // res.json({ token: token });
        // Generate access token
        // Set the expiration time for the token
        const accessToken = jwt.sign({ id: req.user.id, role: req.user.role }, MYSECRETJWTKEY, { expiresIn: '15m' });
        // Generate refresh token
        // Set the expiration time for the token
        const refreshToken = jwt.sign({ id: req.user.id }, REFRESHSECRETJWTKEY, { expiresIn: '7d' });
        // Store the refresh token
        refreshTokens.push(refreshToken);
        res.json({ accessToken, refreshToken }); 
    }
)

// The refresh token route, that generates a new access token
app.post('/refresh', (req,res) => {
    const refreshToken = req.body;
    if(!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Invalid Refresh Token' });
    }
    jwt.verify(refreshToken, REFRESHSECRETJWTKEY, (err, payload) => {
        if(err) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }
        const user = users.find(user => user.id === payload.id);
        if(!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        const accessToken = jwt.sign({ id: user.id, role: user.role }, MYSECRETJWTKEY, { expiresIn: '15m' });
        res.json({ accessToken });
    })
})

// Logout route, that removes the refresh token from the storage
app.post('/logout', (req, res) => {
    const refreshToken = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(204).send();
})

app.get('/protectedWithJwt', 
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
    // Now the token is validated and we are good to go for successful response
    res.send('You are authenticated');
})

// GET /posts route
app.get('/posts',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    (req, res) => {
    res.send(posts);
})

// POST /posts route to add a new post (only for admin)
app.post('/posts',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    (req, res) => {
    const { message } = req.body;
    if(message) {
        posts.push(message);
        res.json({ message: 'Post added successfully' });
    } else {
        res.status(400).json({ message: 'Message is required' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})