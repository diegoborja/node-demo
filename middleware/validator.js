const Joi = require("joi");
const schema = {
    name: Joi.string().min(3).required()
};
const validate = function(body){
    return Joi.validate(body, schema);
}; 

module.exports.validate = validate;