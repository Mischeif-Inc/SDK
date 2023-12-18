function createPanel(options) {
    options = Object.assign({
            title: 'Window Panel',
            width: '300px',
            height: '200px',
            content: 'This is the content of the panel.',
            draggable: true,
            resizable: true,
        },
        options
    );

    const panelContainer = document.createElement('div');
    panelContainer.style.position = 'fixed';
    panelContainer.style.top = '10px';
    panelContainer.style.right = '10px';
    panelContainer.style.width = options.width;
    panelContainer.style.height = options.height;
    panelContainer.style.borderRadius = '8px';
    panelContainer.style.overflow = 'hidden';
    panelContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    panelContainer.style.backgroundColor = '#2c2c2c';
    panelContainer.style.zIndex = '9999';
    panelContainer.style.color = '#fff';

    createTitleBar();
    createContentArea();

    document.body.appendChild(panelContainer);

    if (options.draggable) {
        makeDraggable();
    }

    if (options.resizable) {
        makeResizable();
    }

    function createTitleBar() {
        const titleBar = document.createElement('div');
        titleBar.className = 'M-title-bar'; // Add this line to set the class
        titleBar.style.backgroundColor = '#1e1e1e';
        titleBar.style.padding = '10px';
        titleBar.style.cursor = options.draggable ? 'move' : 'default';
        titleBar.style.userSelect = 'none';
        titleBar.innerHTML = options.title;

        panelContainer.appendChild(titleBar);

        if (options.draggable) {
            const closeButton = document.createElement('span');
            closeButton.style.float = 'right';
            closeButton.style.cursor = 'pointer';
            closeButton.style.fontSize = '18px';
            closeButton.style.lineHeight = '1';
            closeButton.style.marginLeft = '10px';
            closeButton.innerHTML = '×';
            closeButton.addEventListener('click', () => {
                panelContainer.style.display = 'none';
            });
            titleBar.appendChild(closeButton);
        }

        const minimizeButton = document.createElement('span');
        minimizeButton.style.float = 'right';
        minimizeButton.style.cursor = 'pointer';
        minimizeButton.style.fontSize = '18px';
        minimizeButton.style.lineHeight = '1';
        minimizeButton.style.marginLeft = '10px';
        minimizeButton.innerHTML = '-';
        minimizeButton.addEventListener('click', () => {
            if (panelContainer.contentArea.style.display !== 'none') {
                panelContainer.contentArea.style.display = 'none';
                panelContainer.style.height = 'auto';
            } else {
                panelContainer.contentArea.style.display = 'flex';
                panelContainer.style.height = options.height;
            }
        });

        titleBar.appendChild(minimizeButton);
    }


    function createContentArea() {
        const contentArea = document.createElement('div');
        contentArea.className = 'content'; // Add this line to set the class
        contentArea.style.padding = '20px';
        contentArea.style.height = '85%';
        contentArea.style.display = 'flex'; // Add this line to set display to flex
        contentArea.style.flexDirection = 'column'; // Add this line to set flex-direction to column

        panelContainer.appendChild(contentArea);

        // Add a reference to the content area
        panelContainer.contentArea = contentArea;

    }

    function makeDraggable() {
        let isDragging = false;
        let offsetX, offsetY;
        let panelRect;

        const titleBar = panelContainer.querySelector('.M-title-bar');
        if (titleBar) {
            titleBar.addEventListener('mousedown', (e) => {
                isDragging = true;
                offsetX = e.clientX - panelContainer.getBoundingClientRect().left;
                offsetY = e.clientY - panelContainer.getBoundingClientRect().top;
                panelRect = panelContainer.getBoundingClientRect();
            });
        }

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const newLeft = e.clientX - offsetX;
                const newTop = e.clientY - offsetY;

                // Ensure the panel doesn't go outside the viewport
                if (newLeft >= 0 && newTop >= 0 && newLeft + panelRect.width <= window.innerWidth && newTop + panelRect.height <= window.innerHeight) {
                    panelContainer.style.left = newLeft + 'px';
                    panelContainer.style.top = newTop + 'px';
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                panelRect = null;
            }
        });
    }

    function makeResizable() {
        const handle = document.createElement('div');
        handle.className = 'resize-handle';
        handle.style.position = 'absolute';
        handle.style.bottom = '0';
        handle.style.right = '0';
        handle.style.width = '20px';
        handle.style.height = '20px';
        handle.style.background = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWElEQVR42mP8/w7CwB6ERBCMDAwAVY9STTEwAEjO88kAEAGmWIOXzK2JAAAAAElFTkSuQmCC")';
        handle.style.backgroundSize = 'cover';
        handle.style.cursor = 'se-resize';

        let isResizing = false;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            e.preventDefault(); // Prevent text selection during resizing
        });

        const handleMouseMove = (e) => {
            if (isResizing) {
                const newWidth = originalWidth + e.clientX - startX;
                const newHeight = originalHeight + e.clientY - startY;

                panelContainer.style.width = Math.max(newWidth, 200) + 'px';
                panelContainer.style.height = Math.max(newHeight, 100) + 'px';

                // Resize the content area accordingly
                const contentArea = panelContainer.contentArea;
                if (contentArea) {
                    contentArea.style.width = 'auto';
                }
            }
        };


        const handleMouseUp = () => {
            if (isResizing) {
                isResizing = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        };

        let startX, startY;
        let originalWidth, originalHeight;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            originalWidth = panelContainer.offsetWidth;
            originalHeight = panelContainer.offsetHeight;

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            e.preventDefault(); // Prevent text selection during resizing
        });

        panelContainer.appendChild(handle);
    }




    function setContent(content) {
        const contentArea = panelContainer.querySelector('.content');
        if (contentArea) {
            if (typeof content === 'string') {
                contentArea.innerHTML = content;
            } else if (content instanceof HTMLElement) {
                contentArea.innerHTML = ''; // Clear existing content
                contentArea.appendChild(content); // Append the input box
            }
        }
    }

    function addContent(content) {
        const contentArea = panelContainer.querySelector('.content');
        if (contentArea) {
            contentArea.appendChild(content); // Append the input box
        }
    }

    let contentArea = panelContainer.contentArea

    return {
        setContent,
        addContent,
        contentArea,
    };
}

export default createPanel