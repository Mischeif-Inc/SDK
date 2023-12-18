import SDK from "."

let logger = {
    log : (...args) => {
        console.log(...args)
        if (SDK.debug) {
            if (typeof args[0] === "object") {
                SDK.console.log(JSON.stringify(...args))
            } else {
                SDK.console.log(args)
            }
        }
    }
}

export default logger