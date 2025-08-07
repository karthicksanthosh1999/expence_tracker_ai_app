import { ZodError } from "zod";
import { errorFormatResponse } from './response';

export function routeHandlerFunction(error: unknown) {
    if (error instanceof ZodError) {
        return errorFormatResponse(error.message, 422)
    }
    else if (error instanceof Error) {
        return errorFormatResponse(error.message, 500)
    }
    else {
        return errorFormatResponse("An unknown error occurred", 500)
    }
}


