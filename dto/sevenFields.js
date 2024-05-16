const {body, param} = require('express-validator');
const sevenFieldValidationRules = () => {
    return [
        body('species_name', 'Species name is required').not().isEmpty(),
        body('family_name', 'Family name is required').not().isEmpty(),
        body('average_size', 'Average size must be a number').isNumeric(),
        body('habitat', 'Habitat is required').not().isEmpty(),
        body('life_span', 'Life span must be a positive integer').isInt({gt: 0}),
        body('diet', 'Diet is required').not().isEmpty(),
    ];
};

const sevenFieldUpdateRules = () => {
    return [
        param('id', 'UUID required').isUUID(),
        body('species_name', 'Species name is required').optional().not().isEmpty(),
        body('family_name', 'Family name is required').optional().not().isEmpty(),
        body('average_size', 'Average size must be a number').optional().isNumeric(),
        body('habitat', 'Habitat is required').optional().not().isEmpty(),
        body('life_span', 'Life span must be a positive integer').optional().isInt({gt: 0}),
        body('diet', 'Diet is required').optional().not().isEmpty(),
    ];
};



module.exports = {
    sevenFieldValidationRules,
    sevenFieldUpdateRules,
};