const express = require('express')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.urlencoded({extended: false})

const dummyData = [{taskItem: "Work on my portfolio" },{taskItem: "Code and watch anime"},{taskItem: "Sleep"}];

//setting up
const app = express();

//setting template engine
app.set("view engine","ejs");

//use middleware to serve static files
app.use(express.static('./public'));

//########### ROUTES ############

//Get for Tasks: returns all tasks
app.get('/', (req, res) => {
    //rendering tasks view and passing taskToDo data
    res.render('tasks', {taskToDo: dummyData});
});

// Post for tasks: posting a task
app.post('/tasks', urlEncoded, function(req, res){
  //formatting for incoming data to add to my dataset
  let incomingItem = {}
  incomingItem.taskItem = req.body.task
  dummyData.push(incomingItem)
  res.redirect('/')
});

//Delete for tasks: deleting specific tasks
app.delete("/tasks/:id", function(req, res){
    //deleting item from data set
    dummyData.splice(req.params.id, 1);
    res.json(dummyData)
});

  app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})  