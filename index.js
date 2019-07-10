const express = require('express')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.urlencoded({extended: false})
const mysql = require('mysql')
const dummyData = [{blogTitle: "Work on my blog", blogBody: "Working" }];

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : '145520Aw',
  database : 'BlogProject'
});

db.connect(function(err){
  if (err) throw (err);
  console.log("DB is connected...")
});


//setting up
const app = express();

//setting template engine
app.set("view engine","ejs");

//use middleware to serve static files
app.use(express.static('./public'));

//########### ROUTES ############

//Get for myblog: returns all tasks
app.get('/myblog', (req, res) => {
  let sql = 'SELECT * FROM blog';
  db.query(sql, function (err, results) {
    if (err) throw err;
    //rendering tasks view and passing taskToDo data
    res.render('myblog', {taskToDo: results});
  });
});

//Get for Blogs: returns all tasks
app.get('blog.ejs', (req, res) => {
  let sql = 'SELECT body FROM blog';
  db.query(sql, function (err, results) {
    if (err) throw err;
    //rendering tasks view and passing taskToDo data
    res.render('Blogs.ejs', {taskToDo: results});
  });
});


app.post('/myblog', urlEncoded, (req, res) => {
  let task = req.body
  console.log(req.body);
  let sql = 'INSERT INTO blog SET ?' ;
  db.query(sql, task, function (err, results) {
      if (err) throw err;
      // rendering tasks view and passing taskToDo data
      console.log(results)
      res.redirect('myblog')
    });
  });

//Delete for tasks: deleting specific tasks
app.delete("/tasks/:id", function(req, res){
    //deleting item from data set
    dummyData.splice(req.params.id, 1);
    res.json(dummyData)
});

app.get('/home', (req, res) => {
  //rendering tasks view and passing taskToDo data
  res.render('home.ejs', {taskToDo: dummyData});
});



  app.listen(3000, function(err){
    if (err) throw (err)
        console.log(err)
    console.log('Server is live on port 3000')
})  