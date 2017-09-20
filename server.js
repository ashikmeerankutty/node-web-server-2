var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());
hbs.registerHelper('screamIt',(text) => text.toUpperCase());
app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log',log + '\n',(err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintanance.hbs');
// });
app.use((express.static(__dirname + '/public')));
app.get('/',(req,res) => {
	res.render('index.hbs',{
		pageTitle : 'Welcome to my site'
	});

});

app.get('/about',(req,res) => {
		res.render('about.hbs',{
			pageTitle : 'About Page'
		});
});
app.get('/portfolio',(req,res) => {
		res.render('portfolio.hbs',{
			pageTitle : 'Portfolio Page'
		});
});

app.get('/bad',(req,res) => {
	res.send({
		Error : 'Unable to handle request',
		Code :'404'
	})
});
app.listen(port, () => {
	console.log(`server is up at ${port}`);
});
