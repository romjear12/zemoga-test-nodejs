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

const validateBodyRequest = (data) => {
    let valid = true
    Object.keys(data).map((item) => {
        if (!data[item] || data[item] === '') {
            valid = false
        }
    })

    return valid
}

module.exports = {
    responseFormatted,
    validateBodyRequest,
}
