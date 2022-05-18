/* this is just hack to generate static uuid, but I need to find a better way to do. */
function uuid() {
    let e = new Error()
    // console.log(e.stack)
    // e = e.stack.split("\n")[2].split(":")
    e = e.stack.split("\n")[3].split(":")
    let col = e.pop().replace(")", "")
    let row = e.pop()
    let fileName = e.pop().split("/").pop()
    let id = btoa(`${fileName}:${row}:${col}`)
    return id
}


export { uuid }
