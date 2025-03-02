const express = require('express');
const bodyParser = require('body-parser');
const teacherRoutes = require('./internal/module/teacher/route');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const morgan = require('morgan');

require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(morgan(':method :url :response-time :status'))

app.use('/api', teacherRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
