var express    = require('express'); // call express
var app        = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan     = require('morgan'); // used to see requests
var mongoose   = require('mongoose'); // for working w/ our database
var port       = process.env.PORT || 8000; // set the port for our app
//var User     = require('./app/models/user');
var User     = require('./app/models/user');



 // APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
 app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
next();
 });


 // log all requests to the console 
 app.use(morgan('dev'));
 
 // ROUTES FOR OUR API
 // =============================
 
 // basic route for the home page
 app.get('/', function(req, res) {
 	res.send('Welcome to the home page!');
 });
 
 // get an instance of the express router
 var apiRouter = express.Router();
  
 // test route to make sure everything is working 
  // accessed at GET http://localhost:8080/api
 apiRouter.get('/', function(req, res) {
 	res.json({ message: 'hooray! welcome to our api!' });	
  });
  
apiRouter.route('/users/:user_id')

.get(function(req, res) {
     User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);

     // return that user
      res.json(user);
    });
  })

   apiRouter.route('/users')
            
            	// create a user (accessed at POST http://localhost:8080/api/users)
             	.post(function(req, res) {
               				
              	})
              
              	// get all the users (accessed at GET http://localhost:8080/api/users)
              	.get(function(req, res) {
              		User.find(function(err, users) {
              			if (err) res.send(err);
              
            			// return the users
              			res.json(users);
              		});
              	});

  apiRouter.route('/users')
  
    // create a user (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
    
      // create a new instance of the User model
      var user = new User();    
 
      // set the users information (comes from the request)
    user.name = req.body.name;  
     user.username = req.body.username;
    user.password = req.body.password;
    console.log(user);
 
      // save the user and check for errors
    user.save(function(err) {
             if (err) {
                // duplicate entry
                if (err.code == 11000) 
                    return res.json({ success: false, message: 'A user with that\ username already exists. '});
                 else 
                    return res.send(err);
            }
 
      res.json({ message: 'User created!' });
    });
    
  })

  apiRouter.route('/users/:user_id')

  // get the user with that id
  // (accessed at GET http://localhost:8080/api/users/:user_id)

 // update the user with this id
  // (accessed at PUT http://localhost:8080/api/users/:user_id)
  .put(function(req, res) {

   // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);

     // update the users info only if its new
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;

     // save the user
     user.save(function(err) {
       if (err) res.send(err);

       // return a message
        res.json({ message: 'User updated!' });
      });
     });
 })

  // on routes that end in /users/:user_id
  // ----------------------------------------------------
  apiRouter.route('/users/:user_id')
  
 	// delete the user with this id 
	// (accessed at DELETE http://localhost:8080/api/users/:user_id)
	.delete(function(req, res) {
		User.remove({
 			_id: req.params.user_id
 		}, function(err, user) {
 			if (err) return res.send(err);
 
 			res.json({ message: 'Successfully deleted' });
 		});
 	});

  // more routes for our API will happen here
 
 // REGISTER OUR ROUTES -------------------------------
 // all of our routes will be prefixed with /api
  app.use('/api', apiRouter);
 
 // START THE SERVER
 // ===============================
  app.listen(port);
 console.log('Magic happens on port ' + port);

 mongoose.connect('mongodb://localhost:27017/database_new');
    
   


