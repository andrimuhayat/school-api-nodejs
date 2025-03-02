const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School API',
            version: '1.0.0',
            description: 'API for managing teachers and students',
        },
    },
    apis: ['./internal/module/teacher/route.js'],
};

module.exports = swaggerJsdoc(options);
