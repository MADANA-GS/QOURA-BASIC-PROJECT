const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
 
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("listening on port : " + port);
});
let data = [
    {
        id:uuidv4(),
        username:"Madan",
        content: "Hello"

    },
    {
        id:uuidv4(),
        username:"Navya",
        content: "Hello"

    },
    {id:uuidv4(),
        username:"Deeksha",
        content: "Hello"

    },
]
app.get("/posts", (req, res) => {
    res.render("index",{data});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})
app.post("/posts", (req, res) => {
    let {username , content} = req.body;
    data.push({username , content , id:uuidv4()});
    res.redirect("/posts")
})
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = data.find((i)=> id === i.id)
    res.render("show.ejs",{post});
})
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    data = data.filter((post) => post.id !== id);
    res.redirect("/posts");
})
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = data.find((i)=> id === i.id)
    res.render("show",{post});
})
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = data.find((i)=> id === i.id)
    let mn = req.body;
    post.content = mn.content;
    res.redirect("/posts")
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = data.find((i)=> id === i.id)
    res.render("edit.ejs",{post});
})