import type {
    ApiResponse,
    ApplicationSubmissionRequest,
    ApplicationSubmissionResponse,
} from '@/types/api'

import { mockFetch } from './mockFetch'

export function submitApplication(
    application: ApplicationSubmissionRequest
): Promise<ApiResponse<ApplicationSubmissionResponse>> {
    return mockFetch(() => {
        void application

        return {
            id: `application-${Date.now()}`,
            submittedAt: new Date().toISOString(),
        }
    })
}
