export type TUserLogin = {
    email: string,
    password: string
}

export type TUser = {
    id?: string,
    name: string,
    email: string,
    password?: string,
    image?: string,
    createdAt?: string

}

export type TUserResponse = {
    message: string,
    status: number
    response?: TUser,
    error?: string
}

export type TUserResponses = {
    message: string,
    status: number
    response?: TUser[],
    error?: string
}