const db = require("../../platform/database/mysql/mysql");

class TeacherRepository {
    async registerStudents(teacher, students) {
        const trx = await db.transaction();
        try {
            // Ensure the teacher exists; if not, insert them
            let teacherRecord = await trx("teachers").where({email: teacher}).first();
            if (!teacherRecord) {
                const [teacherId] = await trx("teachers").insert({email: teacher}).returning("id");
                teacherRecord = {id: teacherId};
            }

            // Validate and register each student
            for (const student of students) {
                let studentRecord = await trx("students").where({email: student}).first();
                if (!studentRecord) {
                    const [studentId] = await trx("students").insert({email: student}).returning("id");
                    studentRecord = {id: studentId};
                }

                await trx("registrations")
                    .insert({teacher_id: teacherRecord.id, student_id: studentRecord.id})
                    .onConflict(["teacher_id", "student_id"])
                    .ignore();
            }

            await trx.commit();
        } catch (error) {
            await trx.rollback();
            throw {status: 500, message: "Database error: Failed to register students"};
        }
    }


    async getCommonStudents(teachers) {
        try {
            return await db("registrations")
                .join("students", "registrations.student_id", "students.id")
                .join("teachers", "registrations.teacher_id", "teachers.id")
                .whereIn("teachers.email", teachers)
                .groupBy("students.email")
                .select("students.email");
        } catch (error) {
            throw {status: 500, message: "Database error: Failed to fetch common students"};
        }
    }

    async suspendStudent(email) {
        try {
           return  await db("students").where({email}).update({suspended: true});
        } catch (error) {
            throw {status: 500, message: "Database error: Failed to suspend student"};
        }
    }

    async retrieveForNotifications(teacher, mentionedStudents) {
        try {
            // Get registered students who are NOT suspended
            const registeredStudents = await db("registrations")
                .join("students", "registrations.student_id", "students.id")
                .join("teachers", "registrations.teacher_id", "teachers.id")
                .where("teachers.email", teacher)
                .andWhere("students.suspended", false)
                .pluck("students.email");

            // If there are no mentions, return only registered students
            if (mentionedStudents.length === 0) {
                return registeredStudents;
            }

            // Get mentioned students who are NOT suspended
            const mentionedStudentsList = await db("students")
                .whereIn("email", mentionedStudents)
                .andWhere("suspended", false)
                .pluck("email");

            // Merge and remove duplicates
            return [...new Set([...registeredStudents, ...mentionedStudentsList])];

        } catch (error) {
            throw { status: 500, message: "Database error: Failed to retrieve notifications" };
        }
    }


    async findOneStudentByEmail(email) {
        try {
            return await db("students").where({email}).first();
        } catch (error) {
            throw {status: 500, message: "Database error: Failed to retrieve notifications"};
        }
    }
}

module.exports = new TeacherRepository();
