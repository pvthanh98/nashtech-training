export const ErrorTemplate = {
    DataValidation: {
        VALIDATE_00: (message: string) => ({
            code: "VALIDATE_00",
            message
        })
    },
    Employee: {
        EMPLOYEE_NOT_EXIST: {
            code: "EMPLOYEE_NOT_EXIST",
            message: "Employee does not exist"
        }
    }
}