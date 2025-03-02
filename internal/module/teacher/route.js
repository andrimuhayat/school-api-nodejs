const express = require('express');
const teacherHandler = require('../teacher/handler');
const {validateRegister} = require("./validation");
const {validateAndSanitize} = require("../../platform/helper/sanitizeBody");

const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register students to a teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacher:
 *                 type: string
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       204:
 *         description: Students registered successfully
 */
router.post('/register',validateRegister, teacherHandler.registerStudents);

/**
 * @swagger
 * /api/commonstudents:
 *   get:
 *     summary: Retrieve common students for a given list of teachers
 *     parameters:
 *       - in: query
 *         name: teacher
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       200:
 *         description: List of common students
 */
router.get('/commonstudents',validateAndSanitize, teacherHandler.getCommonStudents);

/**
 * @swagger
 * /api/suspend:
 *   post:
 *     summary: Suspend a student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student:
 *                 type: string
 *     responses:
 *       204:
 *         description: Student suspended successfully
 */
router.post('/suspend',validateAndSanitize, teacherHandler.suspendStudent);

/**
 * @swagger
 * /api/retrievefornotifications:
 *   post:
 *     summary: Retrieve students who can receive a notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacher:
 *                 type: string
 *               notification:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of students who will receive the notification
 */
router.post('/retrievefornotifications',validateAndSanitize, teacherHandler.retrieveForNotifications);

module.exports = router;
