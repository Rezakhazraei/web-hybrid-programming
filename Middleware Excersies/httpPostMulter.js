const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

app.get ('/', (req,res) => {

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})