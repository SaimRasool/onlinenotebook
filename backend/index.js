const connectToMongo=require('./db');
const express = require('express'); // require is use to import 
connectToMongo();

const app = express()
const port = 5000

app.use(express.json());
// Available Routes
app.use('/api/auth', require('./route/auth')); 
app.use('/api/notes', require('./route/notes')); 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})