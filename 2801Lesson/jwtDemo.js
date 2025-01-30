const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = 3000

// FOR DEMO ONLY, DO NOT USE IN PRODUCTION  
const MYSECRETJWTKEY = 'mysecret';

passport.use(new BasicStrategy(function(username, password, done) {
    // we can use the username and password to search our user data
    console.log('Basic strategy executing');
    console.log('username: ' + username);
    console.log('password: ' + password);

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

// This operation is protected by thr JWT
app.get('/protected', (req, res) => {
    // is the Authorization field present in the header?
    if(authField == undefined) {
        console.log('No Authorization field');
        res.status(401).send();
        return;
    }
    const bearerCheck = authField.slice(0,6);
    console.log(bearerCheck);
    if(bearerCheck != 'Bearer') {
        res.status(401).send();
        return;
    }

    // Next extract the token from the authField
    const authStrs = authField.split(' ');
    const token = authStrs[1];
    console.log('Token value is: ' + authStrs[1]);

    // Validate the token
    try {
        const payload = jwt.verify(token, 'mysecret');
        // respond with successful operation
        res.send('Great, token is valid');
    } catch (error) {
        console.log('Token is invalid');
        res.status(401).send();
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})