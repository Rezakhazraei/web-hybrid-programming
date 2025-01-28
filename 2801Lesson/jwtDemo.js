const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const express = require('express')
const app = express()
const port = 3000

passport.use(new BasicStrategy(function(username, password, done) {
    // we can use the username and password to search our user data
    console.log('Basic strategy executing');
    console.log('username: ' + username);
    console.log('password: ' + password);

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})