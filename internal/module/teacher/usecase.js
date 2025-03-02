const teacherRepository = require("../teacher/repository");

class TeacherUseCase {
    async registerStudents(teacher, students) {
        return await teacherRepository.registerStudents(teacher, students);
    }

    async getCommonStudents(teachers) {
        const teacherList = Array.isArray(teachers) ? teachers : [teachers];

        let commonStudents = await teacherRepository.getCommonStudents(teacherList);
        if (!commonStudents.length) {
            throw {status: 400, message: `common student is not found`};
        }

        return commonStudents.map((row) => row.email);
    }

    async suspendStudent(email) {
        const student = await teacherRepository.findOneByEmail(email)
        if (!student) {
            throw {status: 400, message: `student is not found`};
        }

        return await teacherRepository.suspendStudent(email);
    }

    async retrieveForNotifications(teacher, notification) {
        const mentionedStudents = (notification.match(/@\w+@\w+\.\w+/g) || []).map((email) => email.slice(1));

        const registeredStudents = await teacherRepository.retrieveForNotifications(teacher,mentionedStudents);
        if (!registeredStudents.length) {
            throw {status: 400, message: `Student for notification is not found`};
        }

        return registeredStudents
    }
}

module.exports = new TeacherUseCase();
