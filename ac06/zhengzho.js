var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/get',function(req,res){  
  var pList = [];  
  for (name in req.query) {
    pList.push({"name": name, "value": req.query[name]});
  }
  var context = {};
  context.param = pList
  res.render('get', context)
});

app.post('/post',function(req,res){
  var qList = []; 
  for (name in req.query) {
    qList.push({"name": name, "value": req.query[name]});
  } 
  var bList = [];
  for (name in req.body) {
    bList.push({"name": name, "value": req.body[name]});
  }
  var context = {};
  context.qList = qList;
  context.bList = bList;
  res.render('post', context)
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});;

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});