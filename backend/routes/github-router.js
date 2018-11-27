const {Router} = require('express')
const superagent = require('superagent')
const fse = require('fs-extra')
const util = require('util')
const moment = require('moment')

const gitHubRouter = module.exports = new Router()
const URL = 'https://api.github.com/users?since=999&per_page=50'
// const URL = 'https://api.github.com/users/Penssake'

const getGithubData = (response) => {
    let data
        return superagent
    .get(URL)
    .then(response => {
        data = JSON.stringify(response.body)
        fse.writeJson(`${__dirname}/../data/user.txt`, util.inspect(data))
        .then(results => {
            console.log('SUCCESS your data has been saved, format JSON')
        }).catch(err => console.error(err))
        return new Date().toJSON();
    })
    .then(jsonDate => {
        fse.writeJson(`${__dirname}/../data/time.txt`, jsonDate, (err) => {
            if(err) throw err
            console.log('Your date has been saved, format JSON')
        })},
    ).catch(err => console.error(err))
    response.send(data)
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
                        response.send(data)
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
