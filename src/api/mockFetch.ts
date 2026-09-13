import { MockApiError } from './types'
import type { ApiResponse } from './types'

const MIN_DELAY_MS = 300
const MAX_DELAY_MS = 800
const ERROR_RATE = 0.2

function getRandomDelay() {
    return Math.floor(
        MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)
    )
}

function delay(ms: number) {
    return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export async function mockFetch<TData>(
    getData: () => TData | Promise<TData>
): Promise<ApiResponse<TData>> {
    await delay(getRandomDelay())

    try {
        if (Math.random() < ERROR_RATE) {
            throw new MockApiError()
        }

        return {
            ok: true,
            data: await getData(),
        }
    } catch (error) {
        if (error instanceof MockApiError) {
            return {
                ok: false,
                error: {
                    message: error.message,
                    status: error.status,
                },
            }
        }

        return {
            ok: false,
            error: {
                message: 'Unexpected mock API error',
                status: 500,
            },
        }
    }
}
