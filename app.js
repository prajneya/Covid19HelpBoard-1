var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/covid19_helpboard");

// Schema Setup
var userSchema = new mongoose.Schema({
  address: String,
  contact: Number,
  requirement: String
});

var User = mongoose.model("User", userSchema);

// User.create({
//   "address": "Granate Hill",
//   "contact": +1404232323,
//   "requirement": "Oxygen Cylinders",
// }, function(err, user){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("New User Created");
//     console.log(user);
//   }
// })

// var users = [{
//           "address": "Some place in India",
//           "contact": 9801033867,
//           "requirement": "Medicines, Water, Rations",
//         }
// ];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  //res.send("COVID-19 HELPBOARD");
  res.render("landing");
});

app.get("/sos", function(req,res){
  User.find({}, function(err, users){
    if(err){
      console.log(err);
    }
    else{
      res.render("sos", {users:users});
    }
  })
});

app.post("/sos", function(req, res){
  var address = req.body.address;
  var contact = req.body.contact;
  var requirement = req.body.requirement;

  var newUser = {address: address, contact: contact, requirement: requirement};

  User.create(newUser, function(err, user){
    if(err){
      console.log(err);
    }
    else{
      console.log("New User Created");
      console.log(user);
    }
  });
  //res.send("Hit the POST Route");
  res.redirect("sos");
});

app.get("/sos/new", function(req,res){
  res.render("new");
});

app.get("*", function(req, res){
  //res.send("COVID-19 HELPBOARD");
  res.render("404");
});

app.listen(3000, function(){
  console.log("Welcome, Mr.Kumar. COVID-19 HELPBOARD Server Running Successfully!");
});