import { NextResponse } from "next/server";


type ApiResponse<T> = {
    success: boolean
    message: string,
    response: T
}


// HELPER FUNCTION FOR SUCCESS RESPONSE
export function formatResponse<T>(response: T, message = "Operation completed successfully", status = 200) {
    return NextResponse.json<ApiResponse<T>>(
        {
            success: true,
            message,
            response,
        },
        { status }
    );
}

// HELPER FUNCTION FOR ERROR RESPONSE
export function errorFormatResponse(message = "Internal Server Error", status = 500) {
    return NextResponse.json<ApiResponse<null>>(
        {
            message,
            success: false,
            response: null
        },
        { status }
    )
}