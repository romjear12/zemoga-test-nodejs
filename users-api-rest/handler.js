'use strict'
const { DynamoDB } = require('aws-sdk')
const { successResponse, errorResponse } = require('./utils/response')

const dynamoDb = new DynamoDB.DocumentClient()

const responseFormatted = (statusCode, data) => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
    }
}

module.exports.find = async (event) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
    }
    // fetch all items from the DynamoDB table (users)
    try {
        const resultQuery = await dynamoDb.scan(params).promise()
        const response = successResponse(resultQuery.Items)

        return responseFormatted(200, response)
    } catch (e) {
        const errors = [{ title: 'Could not fetch the users info. Try again' }]

        return responseFormatted(e.statusCode || 500, errorResponse(errors))
    }
}

module.exports.findOne = async (event) => {
    // fetch item by id param from the DynamoDB table (users)
    const userId = Number(event.pathParameters.id)
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: userId,
        },
    }
    try {
        const resultQuery = await dynamoDb.get(params).promise()
        const response = successResponse(resultQuery.Item)

        return responseFormatted(200, response)
    } catch (e) {
        const errors = [{ title: 'Could not fetch the user info. Try again' }]

        return responseFormatted(e.statusCode || 500, errorResponse(errors))
    }
}

module.exports.update = async (event) => {
    // fetch item by id param from the DynamoDB table (users)
    const userId = Number(event.pathParameters.id)
    const data = JSON.parse(event.body)

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: userId,
        },
        ExpressionAttributeValues: {
            ':description': data.description,
        },
        UpdateExpression: 'SET description = :description',
        ReturnValues: 'ALL_NEW',
    }
    try {
        const resultQuery = await dynamoDb.update(params).promise()
        const response = successResponse({ msg: 'User info updated successfully' })

        return responseFormatted(200, response)
    } catch (e) {
        const errors = [{ title: 'Could not update the user info. Try again' }]

        return responseFormatted(e.statusCode || 500, errorResponse(errors))
    }
}
