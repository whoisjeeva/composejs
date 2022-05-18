import { uuid } from "../util/uuid"
import { Stack } from "../core/Stack"
import { initModifier, destroyModifier, updateArgs, shouldRecompose } from "../util/helper"


class SpacerComposable {
    constructor({ modifier, height, width }, parentScope, id) {
        this.modifier = modifier
        this.height = height
        this.width = width
        this.args = arguments[0]
        this.id = id

        this.root = document.createElement("div")
        this.root.setAttribute("class", "com-spacer noselect")
        this.root.setAttribute("uuid", id)
    }

    compose() {
        return this.connect()
    }

    recompose(args) {
        if (shouldRecompose(this.args, args) || Stack.composableIds.indexOf(this.id) === -1) {
            if (args.height) this.root.style.height = isNaN(args.height) ? args.height : args.height + "px"
            if (args.width) this.root.style.width = isNaN(args.width) ? args.width : args.width + "px"
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
        destroyModifier(this.id, this.root)
        Stack.composableIds.splice(Stack.composableIds.indexOf(this.id), 1)
    }
}


function Spacer({ modifier = Modifier, height, width }, scope, sep) {
    if (!scope) {
        console.error("Scope is required: 'Spacer'")
        return
    }
    let id = uuid()
    if (sep !== undefined) id += (":" + sep)
    let composable = new SpacerComposable({ modifier, height, width }, scope, id)
    scope.appendChild(composable, composable.args, id)
}


export { Spacer }
