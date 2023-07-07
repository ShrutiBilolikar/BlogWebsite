//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
//const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//mongoose.connect("mongodb://localhost:27017/BlogDB",{useNewUrlParser:true});

let posts = [];// global empty array

// In the double quotes we specify the route 
app.get("/", function (req, res) {
  //we render the contents in home.ejs 
  // if we want to pass variables to this ejs file we pass it as JS objects. key= variable in ejs file and value = value from current page
  res.render("home", { para1: homeStartingContent, posts: posts });
});
app.get("/contact", function (req, res) {
  res.render("contact", { ContactUs: contactContent });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
// what should it render when somebody makes a get request
app.get("/compose", function (req, res) {
  res.render("compose");
});
// what should it do when somebody makes a post request -- through the form
// we want to get those inputs from the form -- we will get it through the method in bodyparser module
// req.body.blog -- blog(name of the input field in the form)
app.post("/compose", function (req, res) {
  // this is how we create a JS object 
  const post = {
    title: req.body.blog,
    content: req.body.blogBody
  };
  posts.push(post);
  res.redirect("/");

});
// this is method provided by express express routing parameters
// :name 
app.get("/posts/:postName", function (req, res) {
  const pname = req.params.postName;// from the url obtain the postname and compare name with title with those present in posts array 
  for (let i = 0; i < posts.length; i++) {
    // we're able to use _.lowercase becauxe of lodash
    if (_.lowerCase(pname) == _.lowerCase(posts[i].title)) {
      res.render("post", { displayPostTitle: posts[i].title, displayPostContent: posts[i].content });
    }
  }
});







app.listen(3000, function () {
  console.log("Server started on port 3000");
});
