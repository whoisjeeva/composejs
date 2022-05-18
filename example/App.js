import { Compose } from "../src/core/Compose"
import { Text } from "../src/composable/Text"
import { Box } from "../src/composable/Box"
import { Column } from "../src/composable/Column"
import { Button } from "../src/composable/Button"
import { Spacer } from "../src/composable/Spacer"
import { Align, JustifyContent } from "../src/core/constants"
import { LaunchOnce } from "../src/core/effects"
import { HtmlView } from "../src/composable/HtmlView"
import { TextField } from "../src/composable/TextField"


const App = scope => {

    let tabs = ["tab1", "tab2", "tab3"]
    let selected = scope.stateOf(0)
    
    for (let [i, tab] of tabs.entries()) {
        Button({
            content: scope => Text({ text: tab }, scope, i),
            onClick: e => {
                selected.value = i
            }
        }, scope, i)
    }

    if (selected.value === 0) {
        Box({
            content: scope => Text({ text: "tab1" }, scope)
        }, scope)
    } else if (selected.value === 1) {
        Box({
            content: scope => Text({ text: "tab2" }, scope)
        }, scope)
    } else {
        Box({
            content: scope => Text({ text: "tab3" }, scope)
        }, scope)
    }

    Box({
        content: scope => Text({ text: "STATIC CIN" }, scope)
    }, scope)


    // let text = scope.stateOf("hello, world")

    // TextField({
    //     value: text.value,
    //     onChange: val => text.value = val
    // }, scope)
    
    // Text({ text: "OK! I am static" }, scope)

    // Text({ text: text.value }, scope)

    // HtmlView({
    //     modifier: Modifier.fillMaxWidth(),
    //     factory: () => {
    //         let el = document.createElement("h1")
    //         return el
    //     },
    //     update: el => {
    //         el.textContent = text.value
    //     }
    // }, scope)

    // Button({
    //     content: scope => {
    //         Text({ text: "click me" }, scope)
    //     },
    //     onClick: e => {
    //         text.value = "hello, jeeva"
    //     }
    // }, scope)
}


new Compose("#app").mount(App)
