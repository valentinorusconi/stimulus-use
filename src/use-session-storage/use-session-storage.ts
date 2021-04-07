import { Controller } from 'stimulus'
import { camelize } from '../support'

export interface SessionStorageOptions {
    suffix: boolean
}

const defineSessionStorageGetter = (controller: Controller, keyName: string, initialValue: any, suffix: boolean) => {
    const getterName = suffix ? `${camelize(keyName)}Storage` : camelize(keyName)

    Object.defineProperty(controller, getterName, {
        get(): any {
            try {
                const item = window.sessionStorage.getItem(keyName)
                return item ? JSON.parse(item) : initialValue
            }
            catch (error) {
                console.error(error)
                return initialValue
            }
        },
        set(value): void {
            window.sessionStorage.setItem(keyName, JSON.stringify(value))
        }
    })
}

export const useSessionStorage = (controller: Controller, options: SessionStorageOptions = { suffix: true }) => {
    const sessionStorageItems = (controller.constructor as any).sessionStorage
    const suffix = options.suffix

    // defines the individual sessionStorage getters
    Object.keys(sessionStorageItems).forEach((key: string) => {
        const initialValue = sessionStorageItems[key]
        const item = window.sessionStorage.getItem(key)
        if (!item) {
            window.sessionStorage.setItem(key, JSON.stringify(initialValue))
        }
        defineSessionStorageGetter(controller, key, initialValue, suffix)
    })
}