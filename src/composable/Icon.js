import { uuid } from "../util/uuid"
import { Stack } from "../core/Stack"
import { initModifier, destroyModifier, updateArgs, shouldRecompose } from "../util/helper"


class IconComposable {
    constructor({ modifier, icon }, parentScope, id) {
        this.modifier = modifier
        this.icon = icon
        this.args = arguments[0]
        this.id = id

        this.root = document.createElement("div")
        this.root.setAttribute("class", "com-icon material-icons")
        this.root.setAttribute("uuid", id)
    }

    compose() {
        return this.connect()
    }

    recompose(args) {
        if (shouldRecompose(this.args, args) || Stack.composableIds.indexOf(this.id) === -1) {
            this.root.innerHTML = args.icon
            initModifier(this.id, this.root, args.modifier)
            updateArgs(this.args, args)
            if (Stack.composableIds.indexOf(this.id) === -1) Stack.composableIds.push(this.id)
        }
    }

    connect() {
        this.recompose(this.args)
        return this.root
    }

    disconnect() {
        Stack.composableIds.splice(Stack.composableIds.indexOf(this.id), 1)
        destroyModifier(this.id, this.root)
    }
}


function Icon({ modifier = Modifier, icon }, scope, sep) {
    if (!scope) {
        console.error("Scope is required: 'Icon'")
        return
    }
    let id = uuid()
    if (sep !== undefined) id += (":" + sep)
    let composable = new IconComposable({ modifier, icon }, scope, id)
    scope.appendChild(composable, composable.args, id)
}


export { Icon }
