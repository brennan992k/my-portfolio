import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import storage from './storage'

const __COOKIE_EVENT_NAME__ = "__COOKIE_EVENT_NAME__"

class Cookie {

    static instance

    constructor() {

    }

    static createInstance() {
        const obj = new this()
        return obj
    }

    static shared() {
        if (!this.instance) this.instance = this.createInstance()
        return this.instance
    }

    isServer() {
        return typeof window == 'undefined'
    }

    set = (key, value, onSuccess = () => { }) => {
        if (!this.isServer()) {
            cookie.set(key, value)
            storage.set(__COOKIE_EVENT_NAME__, key)
            onSuccess()
        }
    }

    get = (key, onSuccess = (value) => { }) => {
        if (!this.isServer()) {
            const value = cookie.get(key)
            onSuccess(value)
            return value
        }
        return null
    }

    remove = (key, onSuccess = () => { }) => {
        if (!this.isServer()) {
            cookie.remove(key)
            storage.set(__COOKIE_EVENT_NAME__, key)
            onSuccess()
        }
    }

}

const cookieSignleton = Cookie.shared()


export const useCookie = (key, initialValue) => {

    const [value, setValue] = useState(cookieSignleton.get(key) || initialValue);

    const set = (newValue) => cookieSignleton.set(key, newValue, () => setValue(newValue))

    const handler = (event) => {
        if (event.key == __COOKIE_EVENT_NAME__ && event.newValue !== key)
            cookieSignleton.get(key, (value) => setValue(value))
    }

    useEffect(() => {
        if (!cookieSignleton.isServer()) window.addEventListener("storage", handler)
        return () => window.removeEventListener("storage", handler)
    }, [value])

    return [value, set];
}

export default cookieSignleton