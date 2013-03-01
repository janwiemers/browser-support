(function(){

    Browsersupport = function(options){

        this.classNames = {
            'worker'            : 'worker',
            'fullscreen'        : 'fullscreen',
            'localstorage'      : 'localstorage',
            'websql'            : 'websql',
            'geolocation'       : 'geolocation',
            'indexeddb'         : 'indexeddb',
            'postmessage'       : 'postmessage',
            'hashchange'        : 'hashchange',
            'websockets'        : 'websockets',
            'sessionstorage'    : 'sessionstorage',
            'applicationcache'  : 'applicationcache',
            'video'             : 'video',
            'audio'             : 'audio',
            'draggable'         : 'draggable',
            'canvas'            : 'canvas',
            'webgl'             : 'webgl',
            'touchevent'        : 'touchevent',
            'history'           : 'history'
        };

        for (var i in options.classnames) {
            if (!options.classnames.hasOwnProperty(i)) { continue; }
            this.classNames[i] = options.classnames[i];
        }

        return this;

    }

    browsersupport.prototype = {

        detect: function(){

            var d = document,                           /* reference to document */
                b = d.getElementsByTagName('body')[0],  /* reference to the body element */
                h = d.documentElement,                  /* reference to the html element */
                w = window,                             /* reference to the window */
                n = navigator,                          /* reference to the navigator */
                t = null,                               /* the Testobject */
                f = ' js';                              /* the String for the HTML Element */

            /**
             * HTML5 Worker
             */
            if( !!w.Worker ) { 
                f += ' '+this.classNames.worker;
            }

            /**
             * FullScreenAPI
             */
            if( !!d.mozFullScreen || !!d.webkitIsFullScreen || !!w.fullScreen) { 
                f += ' '+this.classNames.fullscreen;
            }

            /**
             * LocalStorage
             */
            if( !!w.localStorage) {
                f += ' '+this.classNames.localstorage;
            }

            /**
             * WebSQL
             */
            if(!!w.openDatabase) {
                f += ' '+this.classNames.websql;
            }

            /**
             * Geolocation
             */
            if(!!n.geolocation) {
                f += ' '+this.classNames.websql;
            }

            /**
             * Indexed DB
             */
            if(!!w.indexedDB) {
                f += ' '+this.classNames.indexeddb;
            }

            /**
             * Postmessage
             */
            if(!!w.postMessage) {
                f += ' '+this.classNames.postmessage;
            }

            /**
             * hashChange Event
             */
            if(typeof w.onhashchange === 'object') {
                f += ' '+this.classNames.hashchange;
            }

            /**
             * Websockets
             */
            if(!!w.WebSocket) {
                f += ' '+this.classNames.websockets;
            }

            /**
             * Sessionstorage
             */
            if(!!w.sessionStorage) {
                f += ' '+this.classNames.sessionstorage;
            }

            /**
             * ApplicationCache
             */
            if(!!w.applicationCache) {
                f += ' '+this.classNames.applicationcache;
            }

            /**
             * Can play HTML5 Video
             */
            t = d.createElement('video');
            if(typeof t.canPlayType === 'function') {
                f += ' '+this.classNames.video;
            }

            /**
             * Can play HTML5 Audio
             */
            t = d.createElement('audio');
            if(typeof t.canPlayType === 'function') {
                f += ' '+this.classNames.audio;
            }

            /**
             * Drag and Drop Support
             */
            if(typeof t.draggable === 'boolean') {
                f += ' '+this.classNames.draggable;
            }

            /**
             * Canvas Support
             */
            if(!!w.CanvasRenderingContext2D) {
                f += ' '+this.classNames.canvas;   
            }

            /**
             * WebGL Support
             */
            if(!!w.WebGLRenderingContext) {
                f += ' '+this.classNames.webgl;
            }

            /**
             * Touch Event Support
             */
            if(typeof t.ontouchstart === 'object') {
                f += ' '+this.classNames.touchevent;
            }

            /**
             * Manipulate History Support
             */
            if(typeof history.pushState === 'function') {
                f += ' '+this.classNames.history;
            }

            h.className += f;
        }

    };
})();

var d = new browsersupport({
    classnames: {
        'worker': 'w'
    }
}).detect();