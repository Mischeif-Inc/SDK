import SDK from "."

let logger = {
    log : (...args) => {
        console.log(...args)
        if (SDK.debug) {
            SDK.console.log(JSON.stringify(...args))
        }
    }
}

export default logger