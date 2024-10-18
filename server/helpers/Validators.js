// import joi from "joi";

export const ValidateEmail = (mail) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return true;
    } else {
        return false;
    }
};
export const validNo = /^\(?([1-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const isValid = (value) => {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
};

export const isValidRole = (value) => {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    if (!(['SUBADMIN', 'USER', 'SELLER'].includes(value))) return false;
    return true;
};

export const isValidPermission = (value) => {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    if (!(['UPDATE', 'CREATE', 'GET', 'DELETE'].includes(value))) return false;
    return true;
};

// export const validationMiddleware = (req, res, next) => {
//         const schema = joi.object().keys({
//             FirstName: joi.string().required(),
//             lastName: joi.string(),
//             phone: joi.string().regex(/^[0-9]{10}$/),
//             // phone: joi.string().length(10).pattern(new RegExp('/^\(?([1-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/')),
//             // phone: joi.string().phoneNumber().validate('+91494567324'),

//             // phone: joi.string().length(10).phone(/^[0-9]+$/), //valid
//             // phone: joi.number().pattern(new RegExp('/^[0-9]+$/')),

//             email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
//             password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
//             permission: joi.string().valid('UPDATE', 'CREATE', 'GET', 'DELETE'),
//             role: joi.string().valid('ADMIN', 'SUBADMIN', 'USER'),
//         }).unknown(true)
//         const { error } = schema.validate(req.body, { abortEarly: false });
//         if (error) {
//             next(error);
//             // throw ({ status: false, message: error })
//         } else {
//             next()
//         }
//     }
//     // age: joi.number().when("name", { is: "test", then: joi.required().otherwise: joi.optional() })
//     // amount:joi.number().integer().min(1).max(20)
//     // email: joi.string().required().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
//     // email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'outlook'] } }),