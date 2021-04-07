import { Controller } from 'stimulus'
import { useSessionStorage } from 'stimulus-use'

export default class extends Controller {
    static sessionStorage = {
        'userId': '123456',
        'admin': true,
        'email': 'joe@doe.com'
    }

    static targets = [
        'userId',
        'admin',
        'email',
        'input'
    ]

    connect() {
        useSessionStorage(this)

        // individual getters
        this.userIdStorage         // 123456 -> Number
        this.adminStorage          // true -> Boolean
        this.emailStorage         // "joe@doe.com" -> String

        this.userIdTarget.textContent = this.userIdStorage
        this.inputTarget.value = this.userIdStorage
        console.log(this.userIdStorage)
    }

    change(event) {
        this.userIdStorage = event.target.value
        this.userIdTarget.textContent = event.target.value
    }
}