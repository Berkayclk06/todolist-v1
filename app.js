//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let nItems = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

//TAKE VARIABLE FROM LIST.EJS (OR WHERE THE POST METHOD IS)
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
    let today = new Date();

    let options = {
        weekday:"long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay: day, newListItems: nItems});
});

app.post("/", function(req, res){

    let nItem = req.body.newItem;

    nItems.push(nItem);

    res.redirect("/");

})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})