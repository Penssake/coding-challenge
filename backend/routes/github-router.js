const {Router} = require('express')
const Request = require('request')
const jsonParser = require('body-parser').json()

const gitHubRouter = module.exports = new Router()
const URL = 'https://api.github.com/users/Penssake'

gitHubRouter.get('/api/github/users', (request, response, next) => {
    Request.get({
        "headers": { 
            "content-type": "application/json",
            "user-agent": "Penssake"
        },
        "url": URL,
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.dir(body);
    });
})