import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

//array of posts in memory without connecting database as of now
let posts = [
  { id:1, title : "First Post",content:"Hello, this is my first Post!",description:"about my first post"},
  { id:2, title : "Second Post",content:"Hello, this is my second Post!",description:"about my second post" }
];
app.get("/new",(req,res)=>{
  res.render("newpost.ejs")
})

app.post("/new",(req,res)=>{
  //get the title ,descript, content  from the page 
  const { title, content,description} = req.body;

  //create a new post object
  const newPost = { id: posts.length + 1 , title, content ,description};

  //save to in memory array 
  posts.push(newPost);
  //redirect to home page 
  res.redirect("/");
})

app.get("/",(req,res)=>{
  res.render('index.ejs',{posts : posts});
})



app.get("/post/:id",(req,res)=>{
  const postId = parseInt (req.params.id);
  const post = posts.find(post => post.id === postId);

  if(!post){
    return res.render("404error.ejs");
  }

  res.render("post", {post});
})

app.get("/delete/:id",(req,res)=>{
  const postId = parseInt(req.params.id);

  //filter the post with given id 
  posts  = posts.filter(post => post.id !== postId);

  //redirect back to home page 
  res.redirect("/");

})


app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})