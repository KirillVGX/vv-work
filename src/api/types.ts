export type ApiSuccess<TData> = {
    ok: true
    data: TData
}

export type ApiFailure = {
    ok: false
    error: {
        message: string
        status: number
    }
}

export type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure

export class MockApiError extends Error {
    status: number

    constructor(message = 'Mock API request failed', status = 500) {
        super(message)
        this.name = 'MockApiError'
        this.status = status
    }
}
