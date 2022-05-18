import { WebComponent } from "../core/WebComponent"
import { uuid } from "../util/uuid"
import { Stack } from "../core/Stack"
import { initModifier, destroyModifier, updateArgs, shouldRecompose } from "../util/helper"


class TextComposable {
    constructor({ modifier, text, color, textSize, fontWeight, overflow, maxLines }, parentScope, id) {
        this.text = text
        this.modifier = modifier
        this.color = color
        this.textSize = textSize
        this.fontWeight = fontWeight
        this.overflow = overflow
        this.maxLines = maxLines
        this.args = arguments[0]
        this.id = id
        this.isConnected = false

        this.root = document.createElement("div")
        this.root.setAttribute("class", "com-text noselect")
        this.root.setAttribute("uuid", this.id)
    }

    compose() {
        return this.connect()
    }

    recompose(args) {
        if (shouldRecompose(this.args, args) || Stack.composableIds.indexOf(this.id) === -1) {
            this.root.innerHTML = args.text
            
            if (args.color) this.root.style.color = args.color
            if (args.textSize) this.root.style.fontSize = isNaN(args.textSize) ? args.textSize : args.textSize + "px"
            if (args.fontWeight) this.root.style.fontWeight = args.fontWeight
            if (args.overflow) WebComponent.applyStyle(this.root, args.overflow)
            if (args.maxLines) {
                WebComponent.applyStyle(this.root, {
                    "-webkit-line-clamp": args.maxLines,
                    "display": "-webkit-box",
                    "-webkit-box-orient": "vertical"
                })
            }

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


function Text({ modifier = Modifier, text, color, textSize, fontWeight, overflow = {}, maxLines }, scope, sep) {
    if (!scope) {
        console.error("Scope is required: 'Text'")
        return
    }
    let id = uuid()
    if (sep !== undefined) id += (":" + sep)
    let composable = new TextComposable({ modifier, text, color, textSize, fontWeight, overflow, maxLines }, scope, id)
    scope.appendChild(composable, composable.args, id)
}


export { Text }