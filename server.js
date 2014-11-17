var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storage = {};

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log("request came in!");
	next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/questions')
	.post(function(req, res) {
		var id = req.body.id;
		var question = req.body.question;
		storage[id] = question;
		res.json({ message: "Question saved" });
	})
	.get(function(req, res) {
		res.json(storage);
	});

router.route('/questions/:id')
	.get(function(req, res) {
		res.json(storage[req.params.id]);
	})
	.put(function(req, res) {
		var id = req.params.id;
		var question = req.body.question;
		storage[id] = question;
		res.json({message: "Question updated"});
	})
	.delete(function(req, res) {
		var id = req.params.id;
		delete storage[id];
		res.json({message: "Question deleted"});
	});

app.use('/api', router);

app.listen(8080);
console.log('API started');