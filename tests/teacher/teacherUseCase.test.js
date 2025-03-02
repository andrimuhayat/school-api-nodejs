const teacherUseCase = require("../../internal/module/teacher/usecase");
const teacherRepository = require("../../internal/module/teacher/repository");

jest.mock("../../internal/module/teacher/repository");

describe("Teacher Use Case", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // create default mock data
        teacherRepository.registerStudents("teacher@example.com",["student1@example.com","student1@example.com"])
    });

    // Test: Register Students
    describe("registerStudents", () => {
        test("should call repository with correct parameters", async () => {
            teacherRepository.registerStudents.mockResolvedValue(undefined);

            await expect(teacherUseCase.registerStudents("teacher@example.com", ["student1@example.com"]))
                .resolves.not.toThrow();

            expect(teacherRepository.registerStudents).toHaveBeenCalledWith(
                "teacher@example.com",
                ["student1@example.com"]
            );
        });

        test("should throw 500 error if repository fails", async () => {
            // teacherRepository.registerStudents.mockRejectedValue(new Error("DB error"));

            await expect(teacherUseCase.registerStudents("teacher@example.com", ["student1@example.com"]))
                .rejects.toEqual({ status: 500, message: "Database error: Failed to register students" });
        });
    });

    // Test: Get Common Students
    describe("getCommonStudents", () => {
        test("should return list of common students' emails", async () => {
            teacherRepository.getCommonStudents.mockResolvedValue([
                { email: "student1@example.com" },
                { email: "student2@example.com" }
            ]);

            const result = await teacherUseCase.getCommonStudents(["teacher1@example.com"]);

            expect(result).toEqual(["student1@example.com", "student2@example.com"]);
            expect(teacherRepository.getCommonStudents).toHaveBeenCalledWith(["teacher1@example.com"]);
        });

        test("should throw error if no common students found", async () => {
            teacherRepository.getCommonStudents.mockResolvedValue([]);

            await expect(teacherUseCase.getCommonStudents(["teacher1@example.com"]))
                .rejects.toEqual({ status: 400, message: "common student is not found" });
        });

        test("should throw 500 error if repository fails", async () => {
            teacherRepository.getCommonStudents.mockRejectedValue(new Error("DB error"));

            await expect(teacherUseCase.getCommonStudents(["teacher1@example.com"]))
                .rejects.toEqual({ status: 500, message: "Database error: Failed to fetch common students" });
        });
    });

    // Test: Suspend Student
    describe("suspendStudent", () => {
        test("should suspend student if found", async () => {
            teacherRepository.findOneByEmail.mockResolvedValue({ email: "student1@example.com" });
            teacherRepository.suspendStudent.mockResolvedValue(1);

            await expect(teacherUseCase.suspendStudent("student1@example.com")).resolves.not.toThrow();

            expect(teacherRepository.findOneByEmail).toHaveBeenCalledWith("student1@example.com");
            expect(teacherRepository.suspendStudent).toHaveBeenCalledWith("student1@example.com");
        });

        test("should throw error if student not found", async () => {
            teacherRepository.findOneByEmail.mockResolvedValue(null);

            await expect(teacherUseCase.suspendStudent("student@example.com"))
                .rejects.toEqual({ status: 400, message: "student is not found" });

            expect(teacherRepository.findOneByEmail).toHaveBeenCalledWith("student@example.com");
            expect(teacherRepository.suspendStudent).not.toHaveBeenCalled();
        });

        test("should throw 500 error if repository fails", async () => {
            // teacherRepository.findOneByEmail.mockRejectedValue(new Error("DB error"));

            await expect(teacherUseCase.suspendStudent("student1@example.com"))
                .rejects.toEqual({ status: 500, message: "Database error: Failed to suspend student" });

            expect(teacherRepository.findOneByEmail).toHaveBeenCalledWith("student1@example.com");
        });
    });

    // Test: Retrieve Notifications
    describe("retrieveForNotifications", () => {
        test("should return list of registered students", async () => {
            teacherRepository.retrieveForNotifications.mockResolvedValue([
                { email: "student1@example.com" },
                { email: "student2@example.com" }
            ]);

            const result = await teacherUseCase.retrieveForNotifications(
                "teacher@example.com",
                "Hello @student1@example.com @student2@example.com"
            );

            expect(result).toEqual([
                { email: "student1@example.com" },
                { email: "student2@example.com" }
            ]);
            expect(teacherRepository.retrieveForNotifications).toHaveBeenCalledWith(
                "teacher@example.com",
                ["student1@example.com", "student2@example.com"]
            );
        });

        test("should retrieve all students when message is 'Hey everybody'", async () => {
            teacherRepository.retrieveForNotifications.mockResolvedValue([
                { email: "student1@example.com" }
            ]);

            const result = await teacherUseCase.retrieveForNotifications("teacher@example.com", "Hey everybody");

            expect(result).toEqual([{ email: "student1@example.com" }]);
            expect(teacherRepository.retrieveForNotifications).toHaveBeenCalledWith("teacher@example.com", []);
        });


        test("should throw error if no students found", async () => {
            teacherRepository.retrieveForNotifications.mockResolvedValue([]);

            await expect(
                teacherUseCase.retrieveForNotifications("teacher@example.com", "Hey @unknown@example.com")
            ).rejects.toEqual({ status: 400, message: "Student for notification is not found" });

            expect(teacherRepository.retrieveForNotifications).toHaveBeenCalledWith("teacher@example.com", ["unknown@example.com"]);
        });

        test("should throw 500 error if repository fails", async () => {
            // teacherRepository.retrieveForNotifications.mockRejectedValue(new Error("DB error"));

            await expect(
                teacherUseCase.retrieveForNotifications("teacher@example.com", "Hey @student1@example.com")
            ).rejects.toEqual({ status: 500, message: "Database error: Failed to retrieve notifications" });

            expect(teacherRepository.retrieveForNotifications).toHaveBeenCalledWith("teacher@example.com", ["student1@example.com"]);
        });
    });
});
