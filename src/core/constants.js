const Overflow = {
    Hidden: { overflow: "hidden" },
    Scroll: { overflow: "scroll" },
    Auto: { overflow: "auto" },
    Visible: { overflow: "visible" },
    ScrollX: { overflowX: "scroll" },
    ScrollY: { overflowY: "scroll" },
    AutoX: { overflowX: "auto" },
    AutoY: { overflowY: "auto" },
    VisibleX: { overflowX: "visible" },
    VisibleY: { overflowY: "visible" },
    HiddenX: { overflowX: "hidden" },
    HiddenY: { overflowY: "hidden" },
    Ellipsis: { 
        overflow: "hidden", 
        textOverflow: "ellipsis",
        "-webkit-line-clamp": "1",
        "display": "-webkit-box",
        "-webkit-box-orient": "vertical" 
    },
}


const Shape = {
    Circle: { borderRadius: "50%" },
    Rectangle: { borderRadius: "0%" },
    Rounded: { borderRadius: "4px" },
    roundedCorner: function({ all, topStart=0, topEnd=0, bottomEnd=0, bottomStart=0 }) {
        if (all) {
            return { borderRadius: all }
        }
        return { borderRadius: `${topStart} ${topEnd} ${bottomEnd} ${bottomStart}` }
    }
}


const Color = {
    Red: "red",
    Green: "green",
    Blue: "blue",
    Yellow: "yellow",
    Orange: "orange",
    Purple: "purple",
    Cyan: "cyan",
    Magenta: "magenta",
    White: "white",
    Black: "black",
    Gray: "gray",
}


const JustifyContent = {
    Start: { justifyContent: "flex-start" },
    End: { justifyContent: "flex-end" },
    Center: { justifyContent: "center" },
    SpaceBetween: { justifyContent: "space-between" },
    SpaceAround: { justifyContent: "space-around" },
    SpaceEvenly: { justifyContent: "space-evenly" }
}

const Align = {
    End: { alignItems: "flex-end" },
    Start: { alignItems: "flex-start" },
    Center: { alignItems: "center" },
    Baseline: { alignItems: "baseline" },
    Default: { alignItems: "stretch" },
    Initial: { alignItems: "initial" },
    Inherit: { alignItems: "inherit" }
}


export { 
    Overflow,
    Shape,
    JustifyContent,
    Align
}
