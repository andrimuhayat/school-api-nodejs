const {escape} = require('validator');

const validateAndSanitize = (req, res, next) => {
    const validateObject = (obj, objName) => {
        const allowedPattern = /^$|^(https?:\/\/)?[a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=%>\s]+$/;
        const sqlInjectionPattern = /(?:\/\*\*\/|\bselect\b|\bunion\b|\band\b|\bor\b|\bcount\b|\ball_users\b|\bfrom\b|\bwhere\b|=|--|;|\bnull\b|\bdrop\b|\binsert\b)/i;

        obj = obj || {};

        // Ensure the object is valid
        if (typeof obj !== 'object') {
            throw new Error(`Invalid ${objName} payload`);
        }

        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'string') {
                // Step 1: Escape harmful characters
                // obj[key] = escape(obj[key]);

                // Step 2: Check for SQL injection-like patterns
                if (sqlInjectionPattern.test(obj[key])) {
                    return res.status(400).json({error: "Field contains prohibited content or suspicious patterns"});
                }

                // Step 3: Validate against allowed pattern
                if (!allowedPattern.test(obj[key])) {
                    return res.status(400).json({error: "Field contains invalid characters"});
                }
            }
        });
    };

    try {
        // Validate and sanitize req.body
        validateObject(req.body, 'body');

        // Validate and sanitize req.query
        validateObject(req.query, 'query');

        // Proceed to the next middleware
        return next();
    } catch (error) {
        if (!res.headersSent) {
            return res.status(400).json({error: error.message});
        }
    }
};

const validateAndSanitizeBodyJson = (req, res, next) => {
    try {
        const allowedPattern = /^$|^(https?:\/\/)?[a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=%\s]+$/;
        const sqlInjectionPattern = /(?:\/\*\*\/|select|union|and|or|count|all_users|from|where|=|--|;|\bnull\b|\bdrop\b|\binsert\b)/i;

        const rawBody = JSON.stringify(req.body);

        // Step 2: Check for SQL injection-like patterns
        if (sqlInjectionPattern.test(rawBody)) {
            throw new Error(`Field contains prohibited content or suspicious patterns`);
        }

        // Step 3: Validate against allowed pattern
        if (!allowedPattern.test(rawBody)) {
            throw new Error(`Field contains invalid characters`);
        }
        // Parse the body if valid
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }


};

module.exports = {validateAndSanitize,validateAndSanitizeBodyJson};
