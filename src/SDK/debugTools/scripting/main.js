import SDK from "../..";
import hookTool from "../../hookTool/main";

const testScript = {
    commands: {
      "help": {
        type: "function",
        callback: () => {
            SDK.logger.log("Available commands:");
          for (let command in testScript.commands) {
            SDK.logger.log(`- ${command}`);
          }
        }
      },
      "print": {
        type: "function",
        callback: (args) => {
            SDK.logger.log(...args);
        }
      },
      "clear": {
        type: "function",
        callback: () => {
            SDK.console.clearConsole()
        }
      },
      "addHook": {
        type: "function",
        callback: hookTool
      },
    },
    parser: {
      getArgs(args) {
        return args.split(' ');
      }
    },
    run(script) {
      let args = this.parser.getArgs(script);
      let command = args[0];
      let commandArgs = args.slice(1);
  
      if (this.commands.hasOwnProperty(command)) {
        let commandObject = this.commands[command];
  
        if (commandObject.type === "function" && typeof commandObject.callback === "function") {
          commandObject.callback(commandArgs);
        } else {
            SDK.logger.log(`Invalid command type or callback for command: ${command}`);
        }
      } else {
        SDK.logger.log(`Command not found: ${command}`);
      }
    },
    darkModeStyles: {
      container: `
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: #2b2b2b;
          color: #fff;
          font-family: 'Lucida Console', Monaco, monospace;
          box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
          max-height: 50vh;
          z-index: 9999;
          padding: 5px;
      `,
      header: `
          font-size: 15px;
          margin-bottom: 10px;
          padding: 10px;
          background: black;
      `,
      inputContainer: `
          display: flex;
          flex-direction: row; 
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          background: #1a1a1a;
      `,
      input: `
          flex: 1;
          padding: 8px;
          border: none;
          background: rgb(30 30 30);
          color: white;
          font-family: 'Lucida Console', Monaco, monospace;
          border-radius : 0px;
      `,
      consoleOutput: `
          color: white;
          margin-bottom: 5px;
          white-space: pre-wrap;
      `
    },
  };

  export default testScript