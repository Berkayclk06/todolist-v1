//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

const nItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

//TAKE VARIABLE FROM LIST.EJS (OR WHERE THE POST METHOD IS)
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    
    const day = date.getDate();

    res.render("list", {listTitle: day, newListItems: nItems});
});

app.post("/", function(req, res){

    const item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        nItems.push(item);
        res.redirect("/");
    }
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(process.env.PORT, function(){
    console.log("Server is running on port 3000");
})