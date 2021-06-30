const validateFields = require('./validate-fields');
const validateFile = require('./validate-file');
const validateJWT = require('./validate-jwt');

module.exports = {
    ...validateFields,
    ...validateFile,
    ...validateJWT,
}