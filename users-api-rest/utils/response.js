/**
 * Summary
 *
 * This file handle the response of HTTP requests.
 * Standard used: JSON API https://jsonapi.org/
 *
 * Object response
 *  {
 *      meta: Object,
 *      data: Object|Array,
 *      errrors: Array
 *  }
 *
 */

/**
 * Return response object when is a SUCCESS response
 * @param   {Object}  meta    Metadata of response
 * @param   {Object}  data    Body of response
 * @return  {Object}
 */
const successResponse = (data, meta = null) => {
    const body = {
        data,
        meta,
        errors: null,
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
    }
}

/**
 * Return response object when is a ERROR response
 * @param   {Array}   errors    Array of errors
 * @return  {Object}
 */
const errorResponse = (code, errors) => {
    const body = {
        data: null,
        meta: null,
        errors,
    }
    return {
        statusCode: code,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body),
    }
}

module.exports = {
    successResponse,
    errorResponse,
}
