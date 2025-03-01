const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
