(function($){
    var plugin = {
        protected: {
            'wasCreated': false
        },
        options: {
            /**
             * Enabled features
             */
            'features': {
                'pan': true,
                'zoom': true,
                'mouse-wheel-zoom': true
            },

            /**
             * Events
             */
            'events': {
                'ajax': {
                    'before': null,
                    'complete': null,
                    'done': null,
                    'fail': null
                },
                'onBeforeShow': null,
                'onAfterShow': null,
                'onBeforeHide': null,
                'onAfterHide': null,
                'onAfterClose': null,
                'onAfterZoomIn': null,
                'onAfterZoomOut': null
            },

            /**
             * Overlay options
             */
            'overlay': {
                'enabled': true
            },

            /**
             * Add additional CSS class to imageViewer overall container
             */
            'css': {
                'additionalClass': null
            },

            /**
             * Available options:
             *  - `full` - fit by width and height
             *  - `width` - fit by width
             *  - `height` - fit by height
             *  - `none` - not fit
             */
            'fitSize': 'full'
        },

        _internalOverlay: {
            domObject: null,
            overlayDomObject: null,
            windowDomObject: null,

            create: function() {
                this.windowDomObject = $('<div class="jib-window">')
                this.overlayDomObject = $('<div class="jib-overlay">').append(this.windowDomObject);
                this.domObject = $('<div class="jquery-image-viewer-overlay">').append(this.overlayDomObject);

                return this.windowDomObject;
            },

            destroy: function() {
                this.domObject.remove();
            }
        },

        constructor: function(options) {
            if(this.protected.wasCreated) {
                throw new Error('imagePreview already was initialized');
            }

            this.options = $.extend(true, plugin.options, options);
            this.protected.wasCreated = true;
        },

        open: function() {

        },

        view: function() {

        }
    };

    $.fn.imageViewer = function() {
        // create a imageViewer
        if(typeof arguments[0] == 'object') {
            return plugin.method.constructor.apply(this);
        }else if(typeof arguments[0] == 'string') {
            var method = arguments[0];

            if(!(plugin.method[method])) {
                throw new Error('No method `'+method+'` found');
            }

            if(method.substr(0, 1) == '_') {
                throw new Error('Method `'+method+'` is protected');
            }

            return plugin.method[method].apply(this, arguments);
        }else{
            throw new Error('Invalid imageViewer call');
        }
    }
})(jQuery);