import { Stack } from "../core/Stack"

function initModifier(id, el, modifier) {
    if (modifier) {
        modifier.$init(el)
        destroyModifier(id, el)
        Stack.modifiers[id] = modifier
    }
}

function destroyModifier(id, el) {
    if (id in Stack.modifiers) {
        Stack.modifiers[id].$destroy(el)
        delete Stack.modifiers[id]
    }
}

function updateArgs(composable, args) {
    let keys = Object.keys(args)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let val1 = composable[key]
        let val2 = args[key]

        if (val1 instanceof HTMLElement || val2 instanceof HTMLElement || val1 instanceof Function || val2 instanceof Function) {
            continue
        }

        composable[key] = args[key]
    }
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

function shouldRecompose(composable, args, canCompose = false) {
    for (let key in args) {
        let val1 = composable[key]
        let val2 = args[key]

        if (val1 instanceof HTMLElement || val2 instanceof HTMLElement || val1 instanceof Function || val2 instanceof Function) {
            continue
        }

        if (isObject(val1) && isObject(val2)) {
            shouldRecompose(val1, val2, canCompose)
        }

        else if (val1 !== val2) {
            canCompose = true
            break
        }
    }

    return canCompose
}


export { initModifier, destroyModifier, updateArgs, shouldRecompose }
