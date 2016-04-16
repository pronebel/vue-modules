var _ = require('lodash')

(function () {

    function install (Vue) {
        /**
         * Register collection of components.
         *
         * @param components
         */
        Vue.registerComponents = function (components) {
            for (var index in components) {
                this.component(index, components[index])
            }
        }

        /**
         * Register collection of partials.
         *
         * @param partials
         */
        Vue.registerPartials = function (partials) {
            for (var index in partials) {
                this.partial(index, partials[index])
            }
        }

        /**
         * Register all components and partials in module recursively.
         *
         * @param module
         */
        Vue.registerModule = function (module) {
            if (module.modules) {
                var modules = module.modules

                for (var index in modules) {
                    this.registerModule(modules[index])
                }
            }

            this.registerPartials(module.partials)
            this.registerComponents(module.components)
        }

        /**
         * Get routes from module recursively.
         *
         * @param module
         * @returns {{}}
         */
        Vue.getRoutes = function (module) {
            var routes = {}

            if (module.modules) {
                var modules = module.modules

                for (var index in modules) {
                    var childRoutes = this.getRoutes(modules[index])
                    _.merge(routes, childRoutes)
                }

                return routes
            }

            return module.routes
        }
    }

    if (typeof exports == "object") {
        module.exports = install
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return install })
    } else if (window.Vue) {
        Vue.use(install)
    }

})()