const { DynamoDB } = require('aws-sdk')
const { successResponse, errorResponse } = require('../utils/response')

const dynamoDb = new DynamoDB.DocumentClient()

module.exports.findOne = async (event) => {
    // request validator
    if (!event.pathParameters.id || event.pathParameters.id === '') {
        const errorsValidator = [{ title: 'id parameter is required. Try again' }]
        const errorValidator = errorResponse(e.statusCode || 404, errorsValidator)

        return errorValidator
    }

    // fetch item by id param from the DynamoDB table (users)
    const userId = Number(event.pathParameters.id)
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: userId,
        },
    }

    let response = null
    try {
        const resultQuery = await dynamoDb.get(params).promise()

        if (resultQuery.Item) {
            response = successResponse(resultQuery.Item || null)
        } else {
            const notFoundError = [{ title: 'User not found. Try again later' }]
            response = errorResponse(404, notFoundError)
        }

        return response
    } catch (e) {
        const errors = [{ title: 'Could not fetch the user info. Try again' }]
        response = errorResponse(e.statusCode || 500, errors)

        return response
    }
}

module.exports.update = async (event) => {
    if (!event.pathParameters.id || event.pathParameters.id === '') {
        const errorsValidator = [{ title: 'id parameter is required. Try again' }]
        const errorValidator = errorResponse(e.statusCode || 404, errorsValidator)

        return errorValidator
    }

    const userId = Number(event.pathParameters.id)
    const paramsFind = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: userId,
        },
    }

    // validate user already exist in the DB
    // otherwise returns 404 error
    try {
        const resultQueryFind = await dynamoDb.get(paramsFind).promise()

        if (!resultQueryFind.Item) {
            const notFoundError = [{ title: 'User not found. Try again later' }]
            const responseNotFound = errorResponse(404, notFoundError)

            return responseNotFound
        }
    } catch (e) {
        const errors = [{ title: 'Could not fetch the user info. Try again' }]
        response = errorResponse(e.statusCode || 500, errors)

        return response
    }

    // body request
    const data = JSON.parse(event.body)
    const isValidate = validateBodyRequest(data)

    if (!isValidate) {
        const errorsRequest = [{ title: 'Could not update the user info. Object is not valid' }]
        const errorRequest = errorResponse(422, errorsRequest)

        return errorRequest
    }
    // config to update item on DynamoDB table
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: userId,
        },
        ExpressionAttributeValues: {
            ':description': data.description,
            ':first_name': data.first_name,
            ':last_name': data.last_name,
            ':profile_image_url': data.profile_image_url,
        },
        UpdateExpression:
            'SET description = :description, first_name = :first_name, last_name = :last_name, profile_image_url = :profile_image_url',
        ReturnValues: 'ALL_NEW',
    }
    try {
        const resultQuery = await dynamoDb.update(params).promise()
        const response = successResponse({
            title: 'User info updated successfully',
            data: resultQuery.Attributes,
        })

        return response
    } catch (e) {
        const errors = [{ title: 'Could not update the user info. Try again' }]
        const error = errorResponse(e.statusCode || 500, errors)

        return error
    }
}
