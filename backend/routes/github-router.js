const {Router} = require('express')
const superagent = require('superagent')
const fse = require('fs-extra')
const util = require('util')
const moment = require('moment')

const gitHubRouter = module.exports = new Router()
const URL = 'https://api.github.com/users?since=999&per_page=50'
// const URL = 'https://api.github.com/users/Penssake'

const getGithubData = (response) => {
    console.log('ad one in here')
    let data = undefined;
    return superagent
    .get(URL)
    .then(response => {
        data = response.body
        fse.writeJson(`${__dirname}/../data/user.txt`, JSON.stringify(data))
        .then(results => {
            console.log('SUCCESS your data has been saved, format JSON')
        }).catch(err => console.error(err))
        return new Date().toJSON();
    })
    .then(jsonDate => {
        fse.writeJson(`${__dirname}/../data/time.txt`, jsonDate, (err) => {
            if(err) throw err
            console.log('Your date has been saved, format JSON')
            return response.json(filteredFrontendData(data));
        })},
    ).catch(err => console.error(err))
}

const filteredFrontendData = (data) => {
    const result = [];
    for(let x of JSON.parse(data)) {
        console.log(x);
        result.push({
            login: x.login, 
            avatar: x.avatar_url
        });
    }
    console.log(result)
    return result
}

gitHubRouter.get('/api/github/users',(request, response, next) => {
    console.log('something')
    return fse.pathExists(`${__dirname}/../data/time.txt`)
    .then(pathExists => {
        if(pathExists) {
            return fse.readJson(`${__dirname}/../data/time.txt`)
            .then(dateObj => {
                let storedDate = moment(dateObj)
                let storedDatePlusDelta = moment(storedDate).add(1, 'hours')
                let now = moment()
                if(now.isBetween(storedDate, storedDatePlusDelta)) {
                    return fse.readJson(`${__dirname}/../data/user.txt`) 
                    .then(data => {
                        return response.json(filteredFrontendData(data));
                    })
                } else {
                    return getGithubData()
                }
            })
        } else {
            return getGithubData()
        }
    })
})
