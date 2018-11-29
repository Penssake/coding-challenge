const {Router} = require('express')
const superagent = require('superagent')
const fse = require('fs-extra')
const util = require('util')
const moment = require('moment')

const gitHubRouter = module.exports = new Router()

const getGithubData = (response) => {
    let data
    return superagent
    .get(process.env.URL)
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
    const result = []
    for(let user of JSON.parse(data)) {
            result.push({
                login: user.login, 
                avatar: user.avatar_url
            });
        }
    return result
}

const filterFollowersData = (data) => {
    const result = []
    for(let follower in data.body) {
        result.push(data.body[follower].login);
    }
    console.log(Array.isArray(result))
    return result
}

gitHubRouter.get('/api/github/users', (request, response, next) => {
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

gitHubRouter.get('/api/github/user/followers/:user', (request, response, next) => {
    if(request.params.user.startsWith('a') || request.params.user.startsWith('A')) {
        let user = request.params.user
        return superagent
        .get(`https://api.github.com/users/${user}/followers`)
        .then(data => {
            return response.json(filterFollowersData(data))
        }).catch(err => console.error(err))
    } else {
        console.log('NO A')
    }
})
