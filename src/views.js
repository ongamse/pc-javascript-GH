const secured = require('./Controllers/Secured');

module.exports = app => {
  // Exploits app Env
  app.get('/env', (req, res) => {
    console.log(app.get(req.query.lookup));
    res.send(app.get(req.query.lookup));
  });
  app.get(`/login`, (req, res) => res.render('Login'));

  app.get(`/user-input`, (req, res) => {
	const sanitizeHtml = require('sanitize-html');

	(req, res) => {
	  /*
	    User input vulnerability,
	    if the user passes vulnerable javascipt code, its executed in user's browser
	    ex: alert('hi')
	  */
	  let result = '';
	  try {
		// Sanitize user input to prevent code injection
		const userInput = sanitizeHtml(req.query.userInput);
		result = require('util').inspect(eval(userInput));
	  } catch (ex) {
		console.error(ex);
	  }
	  res.render('UserInput', {
		userInput: req.query.userInput, // It's better to display the sanitized input instead of the original one
		result,
		date: new Date().toUTCString()
	  });
	}

  app.get(`/`, secured.get);
  app.post(`/`, secured.post);
};

