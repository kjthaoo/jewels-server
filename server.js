//backend server side
const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{ //first one is the request, then the response
    res.sendFile(__dirname+"/index.html");
}); 

let houses = [ //now our json data
    {name: "Farmhouse"},
    {name: "Cool House"}
];

let items = [
    {name: "Item 1", description: "This is item 1", price: 10},
    {name: "Item 2", description: "This is item 2", price: 20},
    {name: "Item 3", description: "This is item 3", price: 30}
];

app.get("/api/items", (req, res) => {
    res.json(items);  // Sends the items data to the frontend
});

app.get("/api/houses", (req, res)=>{
    res.send(houses);
});

app.listen(3001, ()=>{ //listen to port 3001 and we're going to execute this function
    console.log("I'm listening");
});