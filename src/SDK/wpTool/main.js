function wpTool (context, webpackInstance) {
    if (typeof context === "undefined") {
        context = window
    }
    
    // If webpackInstance is not provided, try to find it in the window object
    if (typeof webpackInstance === "undefined") {
        webpackInstance = context[Object.keys(context).find((propertyName) =>
            propertyName.includes("webpack")
        )];
    }

    // Wrapper object for webpack instance
    const wpToolInstance = {
        context : context,
        webpackInstance: webpackInstance,
        require: null,  // Reference to webpack require function

        // Initialize wpToolInstance
        init: function () {
            try {
                // Try to push a new module to webpackInstance
                webpackInstance.push([
                    [Symbol()], {}, (r) => this.require = r
                ]);
            } catch (e) {
                // If push fails, initialize require using a fallback method
                this.require = webpackInstance([''], {['']: (a, b, c) => { a.exports = c }}, ['']);
            }

            // Check if the cache is public. If not, hook and fix it
            if (!wpToolInstance.require.c) {
                try {
                    let extractedCache = null;
                    const sym = Symbol();
    
                    // Define a getter on Object.prototype to intercept require calls
                    context.Object.defineProperty(context.Object.prototype, sym, {
                        get() {
                            extractedCache = this;
                            return {
                                exports: {}
                            };
                        },
                        set() {},
                        configurable: true,
                    });
    
                    // Trigger a require call to extract the cache
                    wpToolInstance.require(sym);
                    delete context.Object.prototype[sym];
    
                    // Clean up the extracted cache and set it as the require cache
                    if (extractedCache) delete extractedCache[sym];
                    wpToolInstance.require.c = extractedCache;
                } catch (e) {}
            }
        },

        // Getters for modules and cache
        get modules() {
            return wpToolInstance.require.m;
        },

        get cache() {
            return wpToolInstance.require.c;
        },

        // Get a module based on a filter function and options
        getModule: function (filter, options = { first: true }) {
            // Helper function to create a filter based on properties
            function byProperties(...properties) {
                return m => properties.every(e => m?.[e]);
            }

            // If filter is a string, convert it to a filter function
            if (typeof filter == "string") {
                let filterVal = filter;
                filter = byProperties(filterVal);
            }

            const module = [];

            // Iterate through the cache to find matching modules
            for (const { i, exports } of Object.values(wpToolInstance.require.c)) {
                try {
                    // Check the main exports
                    if (filter(exports, wpToolInstance.require.c[i], i)) {
                        if (options.first) {
                            return exports;
                        }
                        module.push(exports);
                    }

                    // Check the properties of the exports
                    for (const j of Object.getOwnPropertyNames(exports ?? {})) {
                        if (filter(exports?.[j], wpToolInstance.require.c[i], i)) {
                            if (options.first) {
                                return exports?.[j];
                            }
                            module.push(exports?.[j]);
                        }
                    }
                } catch (e) {}
            }

            return module;
        },
    };

    // Initialize wpToolInstance
    wpToolInstance.init();

    return wpToolInstance;
};

export default wpTool