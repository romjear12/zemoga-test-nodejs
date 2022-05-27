'use strict'
const got = require('got')

const TWITTER_API_KEY = 'KRy7l0v8wex3w8Sy5zThai3Ea'
const TWITTER_API_SECRET_KEY = 'X2eBm0Y21kYEuR74W3Frqc2JVIizOj8Q1EVGatDsEVVEJo0ucu'
const TWITTER_COUNT_TWEETS = 5
const requestBearerTokenURL = 'https://api.twitter.com/oauth2/token?grant_type=client_credentials'
const timelineByUserURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json'

const getResponseFormatted = (statusCode, data) => {
    return {
        statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }
}

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

const fetchTweetsByUserName = async (bearerToken, username) => {
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

module.exports.tweets = async (event) => {
    const username = event.pathParameters.username

    // Get request token
    const bearerToken = await fetchRequestToken()

    // Get user tweets by username
    const tweets = await fetchTweetsByUserName(bearerToken, username)

    return getResponseFormatted(200, tweets)
}
