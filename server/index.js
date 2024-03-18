const cors = require('cors');
const express = require('express');
const app = express();
const todoListRouter = require('./routes/todolistcontrollers'); 
 

app.use(express.json());
app.use(cors());
app.use('/api', todoListRouter); 

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


