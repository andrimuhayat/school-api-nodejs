const express = require('express');
const bodyParser = require('body-parser');
const teacherRoutes = require('./internal/module/teacher/route');


require('dotenv').config();
const app = express();
app.use(bodyParser.json());

app.use('/api', teacherRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
