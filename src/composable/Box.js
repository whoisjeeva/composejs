import { Scope } from "../core/Scope"
import { uuid } from "../util/uuid"
import { Stack } from "../core/Stack"
import { initModifier, destroyModifier, updateArgs, shouldRecompose } from "../util/helper"


class BoxComposable {
    constructor({ modifier, content }, parentScope, id) {
        this.modifier = modifier
        this.content = content
        this.args = arguments[0]
        this.id = id

        this.root = document.createElement("div")
        this.root.setAttribute("class", "com-box com-layout")
        this.root.setAttribute("uuid", id)

        this.scope = Scope.runComposer(this.root, this.content, id)
    }

    compose() {
        return this.connect()
    }

    recompose(args) {
        if (shouldRecompose(this.args, args) || Stack.composableIds.indexOf(this.id) === -1) {
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
        for (let c of this.scope.children) {
            c.composable.disconnect()
        }
    }
}



function Box({ modifier = Modifier, content }, scope, sep) {
    if (!scope) {
        console.error("Scope is required: 'Box'")
        return
    }
    let id = uuid()
    if (sep !== undefined) id += (":" + sep)
    let composable = new BoxComposable({ modifier, content }, scope, id)
    scope.appendChild(composable, composable.args, id)
}


export { Box }
