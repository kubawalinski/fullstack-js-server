var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var router = express.Router();

router.get('/', function(req, res) {
	console.log("request came in!");
	res.json({ message: 'hooray! welcome to our api!' });	
});

app.use('/api', router);

app.listen(8080);
console.log('API started');