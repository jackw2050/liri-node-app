//https://www.npmjs.com/package/inquirer

var inquirer = require('inquirer');
inquirer.prompt(["Enter something"]).then(function (answers) {
	// Use user feedback for... whatever!! 
	console.log(answers);
});