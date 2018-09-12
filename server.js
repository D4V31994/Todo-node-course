var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

// GET /todos/:id 
app.get('/todos/:id', function (req, res) {
	var todoID = parseInt (req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoID});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed'); 
	// Use _.pick to only pick description and completed


	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	//set body.desciption to be trimmed value
	body.description = body.description.trim();

	// add id field, increment  +1 after
	body.id = todoNextId++;

	// push body into array
	todos.push(body);

	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	var todoID = parseInt (req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoID});

	if (!matchedTodo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
	 	res.json(matchedTodo);
	 }
});

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
	var todoID = parseInt (req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoID});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	} 
	//if the 404 runs, the code below does not. ! is the not operator.

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	} 

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});

