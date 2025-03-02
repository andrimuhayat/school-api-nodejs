const express = require('express');
const teacherHandler = require('../teacher/handler');
const {validateRegister} = require("./validation");
const {validateAndSanitize} = require("../../platform/helper/sanitizeBody");

const router = express.Router();


router.post('/register',validateRegister, teacherHandler.registerStudents);


router.get('/commonstudents',validateAndSanitize, teacherHandler.getCommonStudents);


router.post('/suspend',validateAndSanitize, teacherHandler.suspendStudent);


router.post('/retrievefornotifications',validateAndSanitize, teacherHandler.retrieveForNotifications);

module.exports = router;
