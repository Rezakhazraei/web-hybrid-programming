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

const optionsForJwtValidation = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: MYSECRETJWTKEY
}

passport.use(new BasicStrategy(function(username, password, done) {
    // In a real application, we would use the username
    // and password to search our user data
    const usernameAndPasswordCorrect = true;

    if(usernameAndPasswordCorrect){
     done(null, {
         foo: 'bar'
     });
    }
    else {
        done(null, false);
    }
    
}));

passport.use(new jwtStrategy(optionsForJwtValidation, function(payload, done) {
    // What are we going to do with the payload?
    console.log(payload);
    done(null, true);
}));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/signin',
    passport.authenticate('basic', { session: false }),
    (req,res) => {
        // Create JWT and send it in the response
        const token = jwt.sign({ foo: 'bar' }, 'mysecret');
        res.json({ token: token }); 
    }
)

app.get('/protectedWithJwt', 
    passport.authenticate('jwt', { session: false }),
    (req,res) => {
    // Now the token is validated and we are good to go for successful response
    res.send('You are authenticated');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})