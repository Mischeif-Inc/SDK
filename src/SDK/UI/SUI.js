// Framework functions
const SUI = {
    cssConfig: {
        button: {
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
            outline: '1px solid rgb(255,255,255, 70%)'
        },
        sliderInput: {
            width: '100%',
            height: '20px',
            padding: '0',
            margin: '0',
            appearance: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transition: 'background-color 0.3s ease',
            outline: '1px solid rgb(255,255,255, 70%)'
        },
        textElem: {
            padding: '5px',
            backgroundColor: 'rgba(115 115 115 / 10%)',
            borderRadius: '5px',
        },
        inputElem: {
            width: '100%',
            height: '20px',
            padding: '5px',
            backgroundColor: 'rgba(115 115 115 / 10%)',
            borderRadius: '5px',
            border: '0',
            outline: '0',
            color: 'white',
            outline: '1px solid rgb(255,255,255, 70%)'
        },
        checkboxContainer: {
            margin: '5px',
        },
        checkboxInput: {
            margin: '5px',
        },
        colorPickerContainer: {
            margin: '5px',
        },
        colorPickerInput: {
            margin: '5px',
        },
        overlayDiv: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(15 0 33 / 30%)',
            zIndex: '9998',
            backdropFilter: 'blur(5px)',
            transition: 'opacity 0.2s linear, visibility 0.2s linear',
            opacity: '0',
            visibility: 'hidden',
        },
        overlayHeader: {
            color: "white",
            textAlign: "left",
            fontWeight: "bold",
            fontFamily: '"Fira Sans", sans-serif',
            fontSize: "40px",
            paddingTop: ["90%", "30px"],
            height: "100%",
            position: "absolute",
            bottom: "-90%",
            left: "10px",
            padding: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            textShadow: 'rgb(0, 0, 0) 1px 1px 10px',
        },
        panelContainer: {
            position: 'absolute',
            padding: '20px',
            backgroundColor: 'black',
            fontFamily: 'Fira Sans, sans-serif',
            color: '#fff',
            fontSize: '15px',
            zIndex: '9999',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0)',
            width: '300px',
            outline: '1px solid rgb(255,255,255, 70%)',
            transition: 'opacity 0.2s linear, visibility 0.2s linear',
            opacity: '0',
            visibility: 'hidden',
        },
        panelHeader: {
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '25px',
            cursor: 'move',
            padding: '5px',
        },
    },
    GUI: {
        menus: [],
    },
    utils: {
        dragElement(elmnt) {
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;

            const header = elmnt.querySelector(`#${elmnt.id}header`);
            if (header) {
                header.style.cursor = 'move';
                header.onmousedown = dragMouseDown;
            } else {
                elmnt.style.cursor = 'move';
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
                elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    },
    panel: class panel {
        constructor(title, top, left) {
            this.title = title;
            this.id = title.split(' ').join('-') + '-SUI';
            this.top = top;
            this.left = left;
            this.elements = [];
            SUI.GUI.menus.push(this);
        }
        get element() {
            return document.getElementById(this.id);
        }
        addButton(label, callback) {
            const button = {
                type: 'button',
                label,
                callback,
            };
            this.elements.push(button);
        }
        addSlider(label, min, max, value, onChange) {
            const slider = {
                type: 'slider',
                label,
                min,
                max,
                value,
                onChange,
            };
            this.elements.push(slider);
        }
        addText(content, size) {
            const text = {
                type: 'text',
                size,
                content,
            };
            this.elements.push(text);
        }
        addInput(label, initialValue, onInput) {
            const input = {
                type: 'input',
                label,
                value: initialValue,
                onInput,
            };
            this.elements.push(input);
        }
        addCheckbox(label, checked, onChange) {
            const checkbox = {
                type: 'checkbox',
                label,
                checked,
                onChange,
            };
            this.elements.push(checkbox);
        }

        // New method to add a color picker
        addColorPicker(label, color, onChange) {
            const colorPicker = {
                type: 'colorPicker',
                label,
                color,
                onChange,
            };
            this.elements.push(colorPicker);
        }
        changeTitle(value) {
            this.title = value;
        }
        clear() {
            this.elements = [];
        }
        toggle() {
            const panelElement = this.element;
        
            if (panelElement.style.opacity === '1') {
                panelElement.style.opacity = '0';
                panelElement.style.visibility = 'hidden';
            } else {
                panelElement.style.opacity = '1';
                panelElement.style.visibility = 'visible';
            }
        }
        
    },
    overlay: class overlay {
        constructor(title) {
            if (!SUI.GUI.overlay) {
                this.title = title
                this.id = 'overlayDiv'
                this.loaded = false
                SUI.GUI.overlay = {
                    "title": title,
                    id: "overlayDiv",
                    loaded: false
                }
            } else {
                console.error('already one overlay')
            }
        }
        get element() {
            return document.getElementById(this.id);
        }
        toggle() {
            const panelElement = this.element;
        
            if (panelElement.style.opacity === '1') {
                panelElement.style.opacity = '0';
                panelElement.style.visibility = 'hidden';
            } else {
                panelElement.style.opacity = '1';
                panelElement.style.visibility = 'visible';
            }
        }
    },
    renderer: {
        elements: {
            renderLabel(element) {
                const label = document.createElement('div');
                label.style.padding = '5px';
                label.textContent = element.label;
                return label
            },
            renderButton(element) {
                const buttonElem = document.createElement('div');
                buttonElem.className = 'modMenuItem';
                Object.assign(buttonElem.style, SUI.cssConfig.button);
                buttonElem.style.cursor = 'pointer';
                buttonElem.textContent = element.label;

                buttonElem.addEventListener('mouseenter', () => {
                    buttonElem.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                });

                buttonElem.addEventListener('click', () => {
                    buttonElem.style.backgroundColor = 'rgba(8, 0, 32, 0.8)';
                });

                buttonElem.addEventListener('mouseleave', () => {
                    buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                });

                buttonElem.addEventListener('click', element.callback);
                return buttonElem
            },
            renderSlider(element) {
                const sliderInput = document.createElement('input');
                sliderInput.type = 'range';
                sliderInput.min = element.min;
                sliderInput.max = element.max;
                sliderInput.value = element.value;

                let label = this.renderLabel(element)
                const sliderValueSpan = document.createElement('span');
                sliderValueSpan.textContent = element.value;
                sliderValueSpan.style.float = 'right';
                label.appendChild(sliderValueSpan);

                Object.assign(sliderInput.style, SUI.cssConfig.sliderInput);

                sliderInput.addEventListener('input', () => {
                    element.onChange(sliderInput.value);
                    sliderValueSpan.textContent = sliderInput.value;
                });
                return { label, sliderInput }
            },
            renderText(element) {
                const textElem = document.createElement('div');
                textElem.className = 'modTextItem';
                Object.assign(textElem.style, SUI.cssConfig.textElem);
                textElem.style.padding = '5px';
                if (element.size !== undefined) {
                    textElem.style.fontSize = element.size;
                }
                textElem.textContent = element.content;
                return textElem
            },
            renderInput(element) {
                const inputLabel = document.createElement('div');
                inputLabel.style.padding = '5px';
                inputLabel.textContent = element.label;

                const inputElem = document.createElement('input');
                inputElem.type = 'text';
                Object.assign(inputElem.style, SUI.cssConfig.inputElem);
                inputElem.value = element.value;
                inputElem.addEventListener('input', () => {
                    element.onInput(inputElem.value);
                });

                return { inputElem, inputLabel }
            },
            renderCheckbox(element) {
                const checkboxContainer = document.createElement('div');
                Object.assign(checkboxContainer.style, SUI.cssConfig.checkboxContainer);

                const checkboxLabel = document.createElement('div');
                checkboxLabel.style.padding = '5px';
                checkboxLabel.textContent = element.label;

                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                Object.assign(checkboxInput.style, SUI.cssConfig.checkboxInput);
                checkboxInput.checked = element.checked;

                checkboxInput.addEventListener('change', () => {
                    element.onChange(checkboxInput.checked);
                });

                checkboxContainer.appendChild(checkboxLabel);
                checkboxContainer.appendChild(checkboxInput);

                return checkboxContainer;
            },
            renderColorPicker(element) {
                const colorPickerContainer = document.createElement('div');
                Object.assign(colorPickerContainer.style, SUI.cssConfig.colorPickerContainer);

                const colorPickerLabel = document.createElement('div');
                colorPickerLabel.style.padding = '5px';
                colorPickerLabel.textContent = element.label;

                const colorPickerInput = document.createElement('input');
                colorPickerInput.type = 'color';
                Object.assign(colorPickerInput.style, SUI.cssConfig.colorPickerInput);
                colorPickerInput.value = element.color;

                colorPickerInput.addEventListener('input', () => {
                    element.onChange(colorPickerInput.value);
                });

                colorPickerContainer.appendChild(colorPickerLabel);
                colorPickerContainer.appendChild(colorPickerInput);

                return colorPickerContainer;
            }
        },
        renderElements(menu, menuContainer) {
            const fragment = document.createDocumentFragment();

            menu.elements.forEach((element) => {
                const elemContainer = document.createElement('div');
                elemContainer.style.marginBottom = '10px';

                if (element.type === 'button') {
                    let buttonElem = SUI.renderer.elements.renderButton(element);
                    element.element = elemContainer.appendChild(buttonElem);
                } else if (element.type === 'slider') {
                    let slider = SUI.renderer.elements.renderSlider(element);
                    element.label.element = elemContainer.appendChild(slider.label);
                    element.element = elemContainer.appendChild(slider.sliderInput);
                } else if (element.type === 'text') {
                    let textElem = SUI.renderer.elements.renderText(element);
                    element.element = elemContainer.appendChild(textElem);
                } else if (element.type === 'input') {
                    let input = SUI.renderer.elements.renderInput(element);
                    element.label.element = elemContainer.appendChild(input.inputLabel);
                    element.element = elemContainer.appendChild(input.inputElem);
                } else if (element.type === 'checkbox') {
                    let checkbox = SUI.renderer.elements.renderCheckbox(element);
                    element.element = elemContainer.appendChild(checkbox);
                } else if (element.type === 'colorPicker') {
                    let colorPicker = SUI.renderer.elements.renderColorPicker(element);
                    element.element = elemContainer.appendChild(colorPicker);
                }

                fragment.appendChild(elemContainer);
            });

            menuContainer.appendChild(fragment);
        },

        renderOverlay() {
            if (SUI.GUI.overlay && SUI.GUI.overlay.loaded == false) {
                const overlayDiv = document.createElement('div');
                overlayDiv.id = 'overlayDiv';
                Object.assign(overlayDiv.style, SUI.cssConfig.overlayDiv);

                const header = document.createElement('div');
                header.id = 'overlayHeader';
                Object.assign(header.style, SUI.cssConfig.overlayHeader);
                header.textContent = SUI.GUI.overlay.title;

                overlayDiv.appendChild(header);
                document.body.appendChild(overlayDiv);

                // fix
                SUI.GUI.overlay.loaded = true;

                return overlayDiv;
            }
        },

        renderPanels() {
            SUI.GUI.menus.forEach((menu) => {
                let menuContainer = document.getElementById(menu.id);

                if (!menuContainer) {
                    menuContainer = document.createElement('div');
                    menuContainer.id = menu.id;
                    Object.assign(menuContainer.style, SUI.cssConfig.panelContainer);
                    menuContainer.style.position = 'absolute';
                    menuContainer.style.top = menu.top;
                    menuContainer.style.left = menu.left;
                    menuContainer.style.width = '300px';
                    document.body.appendChild(menuContainer);
                } else {
                    menuContainer.innerHTML = '';
                }

                const menuHeader = document.createElement('div');
                menuHeader.id = `${menu.id}header`;
                Object.assign(menuHeader.style, SUI.cssConfig.panelHeader);
                menuHeader.textContent = menu.title;
                menuContainer.appendChild(menuHeader);

                this.renderElements(menu, menuContainer);

                document.body.appendChild(menuContainer);
                SUI.utils.dragElement(menuContainer);
            });
        },

        render() {
            this.renderOverlay();
            this.renderPanels();
        },
    },
};

export default SUI