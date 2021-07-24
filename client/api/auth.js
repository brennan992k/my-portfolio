import { authURI, TOKEN_STORAGE, USER_ID_STORAGE, USER_INFO_STORAGE } from './config';
import axios, { useResponse } from '../lib/axios'
import _ from 'lodash'
import { useEffect } from 'react';
import storage, { useStorage } from '../lib/storage';
import { useRouter } from 'next/router';

export const usePreSignup = (params) => useResponse(() => axios.post(authURI.prevSignUp, params))

export const useSignup = () => {
    const router = useRouter()
    const request = () => axios.post(authURI.signup, router.query)

    return useResponse(request)
}

export const useSignin = (params) => {
    const router = useRouter()
    const { data, ...rest } = useResponse(() => axios.post(authURI.signin, params))

    useEffect(() => {
        setUserInfo(data, () => router.push("/"))
    }, [data, router])

    return { data, ...rest }
}

export const useForgotPassword = (params) => useResponse(() => axios.post(authURI.forgotpassword, params))

export const useResetPassword = (params) => useResponse(axios.post(authURI.resetpassword, params))

export const useSignOut = () => {
    const router = useRouter()
    const { data, ...rest } = useResponse(() => axios.post(authURI.signout))

    useEffect(() => {
        if (data) clearUserInfo(() => router.push("/account/signin"))
    }, [data, router])

    return { data, ...rest }
};

export const useUserId = () => useStorage(USER_ID_STORAGE)[0]
export const useUserInfo = () => useStorage(USER_INFO_STORAGE)[0]
export const useToken = () => useStorage(TOKEN_STORAGE)[0]

export const setUserInfo = (data, done = () => { }) => {
    if (_.has(data, "access_token") && _.has(data, "_id")) {
        storage.set(TOKEN_STORAGE, data["access_token"])
        storage.set(USER_ID_STORAGE, data["_id"])
        storage.set(USER_INFO_STORAGE, data)
        done()
    }
}

export const clearUserInfo = (done) => {
    storage.remove(TOKEN_STORAGE)
    storage.remove(USER_ID_STORAGE)
    storage.remove(USER_INFO_STORAGE)
    done()
}
