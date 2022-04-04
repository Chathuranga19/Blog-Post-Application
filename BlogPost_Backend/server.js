const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const cors = require("cors");
const BlogPostModel = require("./models/BlogPost.model");
const app = express();
require("dotenv").config();

//define the port number to start
//assign an avalible port, in case 5000 port unavailable.
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*
//bodyparser used beacuse of json
app.use(bodyParser.json());
*/

//get stored mongodb url 
const URL = process.env.MONGODB_URL;

//connect database with following options
mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //UseFindAndModify:false
});

//create the connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Successfully Connected to Mongodb!!");
})

app.use("/api/blogPost/", require("./routes/BlogPost.route"));


//load to port
app.listen(PORT, () => {
    console.log(`Server is up and running on port no: ${PORT}`)
})

//used nodeman in package.json to restart the automatically when changed the code