const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());


const mailjet = require('node-mailjet')
	.connect('cd18c8e79bbe99f95febcda2a50bbdb4', '980395f4618977e5142ada18c45e49a3')
const request = mailjet
	.post("send", {
		'version': 'v3.1'
	})
	.request({
		"Messages": [{
			"From": {
				"Email": "",
				"Name": ""
			},
			"To": [{
				"Email": "ammaralkhooly1@gmail.com",
				"Name": "Ammar"
			}],
			"Subject": "Greetings from Mailjet.",
			"TextPart": "My first Mailjet email",
			"HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
			"CustomID": "AppGettingStartedTest"
		}]
	})
request
	.then((result) => {
		console.log(result.body)
	})
	.catch((err) => {
		console.log(err.statusCode)
	})

const server = app.listen(port, () => {
	console.log(`app listening on port ${port}!`);
});