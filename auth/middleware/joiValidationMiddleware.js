"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joiValidationMiddleware = (schema) => {
    return async (req, res, next) => {
        const { error } = await schema.validate(req.body);
        console.log(schema.validate(req.body));
        const valid = error == null;
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(422).json({ error: message });
        }
    };
};
exports.default = joiValidationMiddleware;
