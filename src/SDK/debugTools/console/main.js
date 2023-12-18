import testScript from "../scripting/main";
import createPanel from "../../UI/main";

function initConsole () {
    const myPanel = createPanel({
        title: 'Console',
        width: '400px',
        height: '300px',
        content: '',
        draggable: true,
        resizable: true,
    });
    
    const contentArea = myPanel.contentArea; // Reference to the content area
    
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    box-shadow: 0 0;
    height: auto;
    `;
    
    const inputElement = document.createElement('input');
    inputElement.id = 'consoleInput';
    inputElement.type = 'text';
    inputElement.style.height = 'null';
    inputElement.style.cssText = testScript.darkModeStyles.input;
    inputContainer.appendChild(inputElement);
    
    
    const logsContainer = document.createElement('div');
    logsContainer.style.cssText =
        'overflow: auto; background-color: rgb(40 40 40); padding: 10px; flex-grow: 1;'; // Updated styles
    
    // Append the input box to the panel's content area
    contentArea.appendChild(logsContainer);
    contentArea.appendChild(inputContainer); // Ensure the input container is appended after logs container
    
    let log = (inputValue) => {
        const commandOutput = document.createElement('div');
        commandOutput.style.cssText = testScript.darkModeStyles.consoleOutput;
        commandOutput.textContent = inputValue;
        logsContainer.appendChild(commandOutput);
    };
    
    // Listen for Enter key press in the input box
    inputElement.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
        // Get the input value
        const inputValue = inputElement.value.trim();
    
        log(`> ${inputValue}`);
        inputElement.value = '';
    
        testScript.run(inputValue);
    
        // Set the wrapper div as the content using the setContent function
        myPanel.addContent(logsContainer);
        myPanel.addContent(inputContainer);
        }
    });

    function clearConsole () {
        logsContainer.innerHTML = ''
    }

    return { myPanel, log, logsContainer, clearConsole }
}

export default initConsole