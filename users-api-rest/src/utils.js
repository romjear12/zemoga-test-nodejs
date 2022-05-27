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

module.exports.responseFormatted = responseFormatted
