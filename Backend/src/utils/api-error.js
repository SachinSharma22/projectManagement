class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message),
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors

        if(stack) {
            this.stack = stack
        } else {
            //this will generate autometically stackTrace to push on stack
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError };