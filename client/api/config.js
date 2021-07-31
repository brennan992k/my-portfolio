export const BASEURI = "/api/v1"

export const articleURI = {
    list: BASEURI + "/article",
    detail: BASEURI + "/article/detail",
    create: BASEURI + "/article/create",
    delete: BASEURI + "/article/delete",
    update: BASEURI + "/article/update",
    like: BASEURI + "/article/like",
    comment: BASEURI + "/article/comment",
}

export const tagURI = {
    list: BASEURI + "/tag",
    detail: BASEURI + "/tag/detail",
    create: BASEURI + "/tag/create",
    delete: BASEURI + "/tag/delete",
    update: BASEURI + "/tag/update",
}

export const categoryURI = {
    list: BASEURI + "/category",
    detail: BASEURI + "/category/detail",
    create: BASEURI + "/category/create",
    delete: BASEURI + "/category/delete",
    update: BASEURI + "/category/update",
}

export const uploadURI = BASEURI + "/upload"

export const authURI = {
    prevSignUp: BASEURI + "/auth/pre-signup",
    signup: BASEURI + "/auth/signup",
    signin: BASEURI + "/auth/signin",
    signout: BASEURI + "/auth/signout",
    forgotpassword: BASEURI + "/auth/forgot-password",
    resetpassword: BASEURI + "/auth/reset-password",

}

export const TOKEN_STORAGE = "TOKEN_STORAGE"
export const USER_ID_STORAGE = "USER_ID_STORAGE"
export const USER_INFO_STORAGE = "USER_INFO_STORAGE"