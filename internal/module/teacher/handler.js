const teacherUseCase = require("../teacher/usecase");

class TeacherHandler {
    async registerStudents(req, res) {
        try {
            const { teacher, students } = req.body;
            await teacherUseCase.registerStudents(teacher, students);
            res.status(204).send();
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async getCommonStudents(req, res) {
        try {
            const teachers = req.query.teacher;
            if (!teachers) {
                return res.status(400).json({ error: "Teacher query parameter is required" });
            }

            const students = await teacherUseCase.getCommonStudents(teachers);
            res.status(200).json({ students });
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async suspendStudent(req, res) {
        try {
            const { student } = req.body;
            await teacherUseCase.suspendStudent(student);
            res.status(204).send();
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async retrieveForNotifications(req, res) {
        try {
            const { teacher, notification } = req.body;
            if (!teacher || !notification) {
                return res.status(400).json({ error: "Teacher and notification message are required" });
            }
            const recipients = await teacherUseCase.retrieveForNotifications(teacher, notification);
            res.status(200).json({ recipients });
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }
}

module.exports = new TeacherHandler();
