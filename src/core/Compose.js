import { uuid } from "../util/uuid"
import { initializeModifier } from "./Modifier"
import { Scope } from "./Scope"
import { Stack } from "./Stack"


class Compose {
    constructor(selector) {
        initializeModifier()
        this.app = document.querySelector(selector)
        this.app.classList.add("compose-box")
        Compose.scopes = []
    }

    static findScope(signature) {
        for (let scope of Compose.scopes) {
            if (scope.signature == signature) {
                return scope
            }
        }
        return null
    }

    static removeScope(signature) {
        let index = null
        for (let i = 0; i < Compose.scopes.length; i++) {
            if (Compose.scopes[i].signature == signature) {
                index = i
                break
            }
        }

        if (index !== null) {
            Compose.scopes.splice(index, 1)
        }
    }

    mount(content) {
        Compose.isComposed = false
        let scope = new Scope(this.app, content)
        scope.signature = uuid()
        scope.compose()
        Compose.scopes.push(scope)
        Compose.isComposed = true
    }
}


export { Compose }
