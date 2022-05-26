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
    return {
        data,
        meta,
        errors: null,
    }
}

/**
 * Return response object when is a ERROR response
 * @param   {Array}   errors    Array of errors
 * @return  {Object}
 */
const errorResponse = (errors) => {
    return {
        data: null,
        meta: null,
        errors,
    }
}

module.exports = {
    successResponse,
    errorResponse,
}
