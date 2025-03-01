const express = require('express');
const bodyParser = require('body-parser');
const teacherRoutes = require('./internal/module/teacher/handler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
app.use(bodyParser.json());

app.use('/api', teacherRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
