'use strict'
const got = require('got')
const { successResponse, errorResponse } = require('../utils/response')

const TWITTER_API_KEY = process.env.TWITTER_API_KEY
const TWITTER_API_SECRET_KEY = process.env.TWITTER_API_SECRET_KEY

const TWITTER_COUNT_TWEETS = 5

// Twitter API resources to fetch information
// Steps
// 1. Request Bearer Token with Api Keys
// 2. Call user timeline endpoint to retrieve user tweets timeline
const requestBearerTokenURL = 'https://api.twitter.com/oauth2/token?grant_type=client_credentials'
const timelineByUserURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json'

/**
 * Fetch Bearer token from Twitter API
 * @returns {string}
 */
const fetchRequestToken = async () => {
    const stringAuth = Buffer.from(`${TWITTER_API_KEY}:${TWITTER_API_SECRET_KEY}`).toString(
        'base64',
    )
    const auth = `Basic ${stringAuth}`
    const options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: auth,
        },
    }
    try {
        const data = await got.post(requestBearerTokenURL, options).json()

        return data.access_token
    } catch (e) {
        throw new Error('Cannot get an oauth2 request token')
    }
}

/**
 * Fetch Timeline tweets by given username from Twitter API
 * @param {string} bearerToken Bearer Token to authorize request
 * @param {string} username Twitter user name
 * @returns {array}
 */
const fetchTweetsByUserName = async (bearerToken, username) => {
    if (!bearerToken || !username) {
        throw new Error('bearerToken and username params are required')
    }
    try {
        const url = `${timelineByUserURL}?screen_name=${username}&count=${TWITTER_COUNT_TWEETS}`
        const options = {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        }
        const data = await got.get(url, options).json()

        return data
    } catch (e) {
        throw new Error('Cannot get tweets from Twitter API')
    }
}

const fetchTweets = async (event) => {
    const username = event.pathParameters.username
    // Get request token
    try {
        const bearerToken = await fetchRequestToken()

        // Get user tweets by username
        const tweets = await fetchTweetsByUserName(bearerToken, username)

        return successResponse(tweets)
    } catch (e) {
        console.log(e)
        const errors = [{ title: 'Could not fetch the users tweets. Try again' }]
        const error = errorResponse(e.statusCode || 500, errors)

        return error
    }
}

module.exports = {
    fetchTweets,
    fetchTweetsByUserName,
}
