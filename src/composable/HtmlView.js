import { uuid } from "../util/uuid"
import { Stack } from "../core/Stack"
import { initModifier, destroyModifier, updateArgs, shouldRecompose } from "../util/helper"


class HtmlViewComposable {
    constructor({ modifier, factory, update }, parentScope, id) {
        this.modifier = modifier
        this.factory = factory
        this.update = update
        this.args = arguments[0]
        this.id = id
        
        this.root = document.createElement("div")
        this.root.setAttribute("class", "com-html com-layout")
        this.root.setAttribute("uuid", id)

        this.root.appendChild(this.factory())
    }

    compose() {
        return this.connect()
    }

    recompose(args) {
        if (shouldRecompose(this.args, args) || Stack.composableIds.indexOf(this.id) === -1) {
            initModifier(this.id, this.root, args.modifier)
            args.update(this.root.children[0])
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



function HtmlView({ modifier = Modifier, factory, update }, scope, sep) {
    if (!scope) {
        console.error("Scope is required: 'HtmlView'")
        return
    }
    let id = uuid()
    if (sep !== undefined) id += (":" + sep)
    let composable = new HtmlViewComposable({ modifier, factory, update }, scope, id)
    scope.appendChild(composable, composable.args, id)
}


export { HtmlView }
