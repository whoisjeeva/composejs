import { uuid } from "../util/uuid"
import { Stack } from "../core/Stack"
import { initModifier, destroyModifier, updateArgs, shouldRecompose } from "../util/helper"


class TextFieldComposable {
    constructor({ modifier, value, onChange, label, disabled }, parentScope, id) {
        this.modifier = modifier
        this.value = value
        this.onChange = onChange
        this.parentScope = parentScope
        this.label = label
        this.disabled = disabled
        this.args = arguments[0]
        this.id = id
    
        this.root = document.createElement("label")
        this.root.innerHTML = `
        <span class="com-label"></span>
        <input class="com-text-field__input" type="text">
        `
        this.root.setAttribute("class", "com-text-field")
        this.root.setAttribute("uuid", id)

        this.labelEl = this.root.querySelector(".com-label")
        this.inputEl = this.root.querySelector("input")
    }

    compose() {
        return this.connect()
    }

    recompose(args) {
        if (shouldRecompose(this.args, args) || Stack.composableIds.indexOf(this.id) === -1) {
            if (args.disabled) {
                this.root.classList.add("com-text-field--disabled")
                this.inputEl.disabled = true
            } else {
                this.root.classList.remove("com-text-field--disabled")
                this.inputEl.disabled = false
            }
            this.inputEl.disabled = args.disabled
            this.labelEl.textContent = this.label
            this.inputEl.value = args.value
            initModifier(this.id, this.root, args.modifier)
            updateArgs(this.args, args)
            if (Stack.composableIds.indexOf(this.id) === -1) Stack.composableIds.push(this.id)
        }
    }

    connect() {
        this.recompose(this.args)
        this.inputEl.addEventListener("input", this.onTextChange.bind(this))
        return this.root
    }

    onTextChange(e) {
        if (this.onChange) {
            this.onChange(this.inputEl.value, e)
        } else {
            this.inputEl.value = this.value
        }
        this.parentScope.recompose()
    }

    disconnect() {
        destroyModifier(this.id, this.root)
        this.inputEl.removeEventListener("input", this.onTextChange)
        Stack.composableIds.splice(Stack.composableIds.indexOf(this.id), 1)
    }
}


function TextField({ modifier = Modifier, value, onChange, label = "", disabled = false }, scope, sep) {
    if (!scope) {
        console.error("Scope is required: 'TextField'")
        return
    }
    let id = uuid()
    if (sep !== undefined) id += (":" + sep)
    let composable = new TextFieldComposable({ modifier, value, onChange, label, disabled }, scope, id)
    scope.appendChild(composable, composable.args, id)
}


export { TextField }

