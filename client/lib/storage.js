import _ from 'lodash'
import { useEffect, useState } from 'react'

class Storage {

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
            let valueSet = typeof value == "object" ? JSON.stringify(value) : value
            window.localStorage.setItem(key, valueSet)
            onSuccess()
        }
    }

    get = (key, onSuccess = (value) => { }) => {
        try {
            if (!this.isServer()) {
                let value = window.localStorage.getItem(key)
                value = JSON.parse(value)
                onSuccess(value)
                return value
            }
            return null
        } catch (error) {
            console.log(error.message)
        }

    }

    remove = (key, onSuccess = () => { }) => {
        if (!this.isServer()) {
            window.localStorage.removeItem(key)
            onSuccess()
        }
    }

}

const storage = Storage.shared()


export const useStorage = (key, initialValue) => {

    const [value, setValue] = useState(storage.get(key) || initialValue)

    const setItem = (newValue) => storage.set(key, newValue, () => setValue(newValue))

    const handler = (event) => {
        if (event.key === key && !_.isEqual(event.newValue, value)) {
            setItem(event.newValue)
        }
        return true
    }

    useEffect(() => {
        if (!storage.isServer()) window.addEventListener("storage", handler)
        return () => window.removeEventListener("storage", handler)
    }, [value])

    return [value, setItem]
}

export default storage
