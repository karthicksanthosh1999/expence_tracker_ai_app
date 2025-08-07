export type TJob = {
    id?: string,
    title: String,
    jobType: String,
    qualification: string,
    experience: string,
    salaryRange: string,
    responsibilities: String,
    requiredSkills: string,
}


export type TJobResponse = {
    message: string,
    status: number
    response?: TJob,
    error?: string
}


export type TJobResponses = {
    message: string,
    status: number
    response?: TJob[],
    error?: string
}