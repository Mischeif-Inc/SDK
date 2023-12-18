import SDK from "..";

function hookTool (hookName) {
    let hook;
    Object.defineProperty(Object.prototype, hookName, {
        configurable: true,
        get() {
            if (this) {
                hook = this;
                SDK.logger.log(hookName + ' found')
                SDK.logger.log(this);
            }
            const descriptor = Object.getOwnPropertyDescriptor(this, hookName);
            return descriptor ? descriptor.value : undefined;
            delete Object.prototype[hookName];
        },
        set(value) {
    
            if (this) {
                hook = this;
                SDK.logger.log(hookName + ' found')
                SDK.logger.log(this);
            }
    
            // Add the hook for the current object
            Object.defineProperty(this, hookName, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: value
            });
            delete Object.prototype[hookName];
        }
    });
    window.hook = hook
}

export default hookTool