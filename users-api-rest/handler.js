'use strict'

const { find, findOne, update } = require('./src/users')
const { fetchTweets } = require('./src/twitter')

module.exports.find = async (event) => await find(event)

module.exports.findOne = async (event) => await findOne(event)

module.exports.update = async (event, context) => await update(event, context)

module.exports.tweets = async (event) => await fetchTweets(event)
