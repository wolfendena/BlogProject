const express = require('express')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.urlencoded({extended: false})

const dummyData = [{blogTitle: "Work on my blog", blogBody: "Working" }];

//setting up
const app = express();

//setting template engine
app.set("view engine","ejs");

//use middleware to serve static files
app.use(express.static('./public'));

//########### ROUTES ############

//Get for Tasks: returns all tasks
app.get('/myblog', (req, res) => {
    //rendering tasks view and passing taskToDo data
    res.render('myblog', {taskToDo: dummyData});
});

// Post for tasks: posting a task
app.post('/tasks', urlEncoded, function(req, res){
  //formatting for incoming data to add to my dataset
  let incomingItem = {}
  incomingItem.taskItem = req.body.task
  dummyData.push(incomingItem)
  res.redirect('/myblog')
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