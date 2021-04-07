import { Controller } from 'stimulus'
import { camelize } from '../support'

export interface LocalStorageOptions {
    suffix: boolean
}

const defineLocalStorageGetter = (controller: Controller, keyName: string, initialValue: any, suffix: boolean) => {
    const getterName = suffix ? `${camelize(keyName)}Storage` : camelize(keyName)

    Object.defineProperty(controller, getterName, {
        get(): any {
            try {
                const item = window.localStorage.getItem(keyName)
                return item ? JSON.parse(item) : initialValue
            }
            catch (error) {
                console.error(error)
                return initialValue
            }
        },
        set(value): void {
            window.localStorage.setItem(keyName, JSON.stringify(value))
        }
    })
}

export const useLocalStorage = (controller: Controller, options: LocalStorageOptions = { suffix: true }) => {
    const localStorageItems = (controller.constructor as any).localStorage
    const suffix = options.suffix

    // defines the individual localStorage getters
    Object.keys(localStorageItems).forEach((key: string) => {
        const initialValue = localStorageItems[key]
        const item = window.localStorage.getItem(key)
        if (!item) {
            window.localStorage.setItem(key, JSON.stringify(initialValue))
        }
        defineLocalStorageGetter(controller, key, initialValue, suffix)
    })
}