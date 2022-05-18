import { Scope } from "../core/Scope"
import { uuid } from "../util/uuid"
import { Stack } from "../core/Stack"
import { initModifier, destroyModifier, updateArgs, shouldRecompose } from "../util/helper"


class OutlinedButtonComposable {
    constructor({ modifier, onClick, content, disabled }, parentScope, id) {
        this.content = content
        this.modifier = modifier
        this.onClick = onClick
        this.disabled = disabled
        this.args = arguments[0]
        this.id = id

        this.root = document.createElement("button")
        this.root.innerHTML = `
        <span class="com-button__label"></span>
        `
        this.root.setAttribute("class", "com-outlined-button")
        this.root.setAttribute("uuid", id)
        this.button = this.root.querySelector(".com-button__label")

        this.scope = Scope.runComposer(this.button, this.content, id)
    }

    compose() {
        return this.connect()
    }

    recompose(args) {
        if (shouldRecompose(this.args, args) || Stack.composableIds.indexOf(this.id) === -1) {
            initModifier(this.id, this.root, args.modifier)
            this.root.disabled = args.disabled
            updateArgs(this.args, args)
            if (Stack.composableIds.indexOf(this.id) === -1) Stack.composableIds.push(this.id)
        }
    }

    connect() {
        this.recompose(this.args)
        
        this.root.addEventListener("click", this.onButtonClick.bind(this))
        this.root.addEventListener("mouseup", this.onMouseUp.bind(this))
        return this.root
    }

    onButtonClick(e) {
        if (!this.disabled) {
            this.onClick(e)
        }
    }

    onMouseUp(e) {
    }

    disconnect() {
        this.root.removeEventListener("click", this.onButtonClick)
        this.root.removeEventListener("mouseup", this.onMouseUp)
        destroyModifier(this.id, this.root)

        Stack.composableIds.splice(Stack.composableIds.indexOf(this.id), 1)
        for (let c of this.scope.children) {
            c.composable.disconnect()
        }
    }
}


function OutlinedButton({ modifier = Modifier, onClick, content, disabled = false }, scope, sep) {
    if (!scope) {
        console.error("Scope is required: 'OutlinedButton'")
        return
    }
    let id = uuid()
    if (sep !== undefined) id += (":" + sep)
    let composable = new OutlinedButtonComposable({ modifier, onClick, content, disabled }, scope, id)
    scope.appendChild(composable, composable.args, id)
}



export { OutlinedButton }
