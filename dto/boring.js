const {body, param} = require('express-validator');

const boringValidationRules = () => {
    return [
        body('name', 'Name is required').not().isEmpty(),
        body('domain', 'Domain is required and must be a valid format')
            .not().isEmpty()
            .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ];
};

const boringUpdateRules = () => {
    return [
        param('id', 'UUID Required').isUUID(),
        body('name', 'Name is required').optional().not().isEmpty(),
        body('domain', 'Domain is required and must be a valid format')
            .optional().not().isEmpty()
            .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ];
};

module.exports = {
    boringValidationRules,
    boringUpdateRules,
};