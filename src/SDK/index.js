import initConsole from "./debugTools/console/main";
import createPanel from "./UI/main";
import wpTool from "./wpTool/main";
import logger from "./logger";
import hookTool from "./hookTool/main";

let debug = false
let globalSDK = false


let SDK = {
    debug : debug,
    logger,
    wpTool,
    createPanel,
    enableDebug,
    hookTool
}

function enableDebug () {
    SDK.debug = true
    SDK.console = initConsole()
}

function initGlobalSDK() {
    window.mischeifSDK = SDK
}

if (debug === true) {
    enableDebug()
}
if (globalSDK === true) {
    initGlobalSDK()
}


export default SDK
