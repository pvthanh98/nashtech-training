export const ErrorTemplate = {
    
    DataValidation: {
        VALIDATE_00: (message: string) => ({
            statusCode: 400,
            code: "VALIDATE_00",
            message
        })
    },

    Employee: {
        EMPLOYEE_NOT_EXIST: {
            statusCode: 400,
            code: "EMPLOYEE_NOT_EXIST",
            message: "Employee does not exist"
        }
    },

    Auth: {
        EMAIL_EXISTED: {
            statusCode: 400,
            code: "AUTH_03",
            message:"Email has already existed"
        },

        EMAIL_PASS_NOT_CORECT: {
            statusCode: 401,
            code: "AUTH_01",
            message: "Email or password is not correct"
        }
    },

    Permission: {
        ADMIN_REQUIRED: {
            statusCode: 403,
            code:"PER_00",
            message: "Admin is required"
        }
    },

    User: {
        NOT_FOUND: {
            statusCode: 404,
            code:"USER_00",
            message: "User not found"
        }
    },
    
}