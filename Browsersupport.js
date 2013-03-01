(function(){

    Browsersupport = function(options){

        this.extend = [];
        this.feature = {
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

        if(options !== undefined) {
            for (var i in options.feature) {
                if (!options.feature.hasOwnProperty(i)) { continue; }
                this.feature[i] = options.feature[i];
            }
        }

        return this;

    }

    Browsersupport.prototype = {

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
                f += ' '+this.feature.worker;
            }

            /**
             * FullScreenAPI
             */
            if( !!d.mozFullScreen || !!d.webkitIsFullScreen || !!w.fullScreen) { 
                f += ' '+this.feature.fullscreen;
            }

            /**
             * LocalStorage
             */
            if( !!w.localStorage) {
                f += ' '+this.feature.localstorage;
            }

            /**
             * WebSQL
             */
            if(!!w.openDatabase) {
                f += ' '+this.feature.websql;
            }

            /**
             * Geolocation
             */
            if(!!n.geolocation) {
                f += ' '+this.feature.websql;
            }

            /**
             * Indexed DB
             */
            if(!!w.indexedDB) {
                f += ' '+this.feature.indexeddb;
            }

            /**
             * Postmessage
             */
            if(!!w.postMessage) {
                f += ' '+this.feature.postmessage;
            }

            /**
             * hashChange Event
             */
            if(typeof w.onhashchange === 'object') {
                f += ' '+this.feature.hashchange;
            }

            /**
             * Websockets
             */
            if(!!w.WebSocket) {
                f += ' '+this.feature.websockets;
            }

            /**
             * Sessionstorage
             */
            if(!!w.sessionStorage) {
                f += ' '+this.feature.sessionstorage;
            }

            /**
             * ApplicationCache
             */
            if(!!w.applicationCache) {
                f += ' '+this.feature.applicationcache;
            }

            /**
             * Can play HTML5 Video
             */
            t = d.createElement('video');
            if(typeof t.canPlayType === 'function') {
                f += ' '+this.feature.video;
            }

            /**
             * Can play HTML5 Audio
             */
            t = d.createElement('audio');
            if(typeof t.canPlayType === 'function') {
                f += ' '+this.feature.audio;
            }

            /**
             * Drag and Drop Support
             */
            if(typeof t.draggable === 'boolean') {
                f += ' '+this.feature.draggable;
            }

            /**
             * Canvas Support
             */
            if(!!w.CanvasRenderingContext2D) {
                f += ' '+this.feature.canvas;   
            }

            /**
             * WebGL Support
             */
            if(!!w.WebGLRenderingContext) {
                f += ' '+this.feature.webgl;
            }

            /**
             * Touch Event Support
             */
            if(typeof t.ontouchstart === 'object') {
                f += ' '+this.feature.touchevent;
            }

            /**
             * Manipulate History Support
             */
            if(typeof history.pushState === 'function') {
                f += ' '+this.feature.history;
            }

            /**
             * Run the extended Tests
             */
            
            for(var i=0; i<this.extend.length; i++) {
                if(this.extend[i].test()) { f += ' '+this.extend[i].feature; }
            }

            h.className += f;
        },

        add: function(test){

            if(typeof test.test !== 'function' || test.feature == '') {
                throw 'oncomplete Object!';
                return;
            }

            this.extend.push(test);


        }

    };
})();

var d = new Browsersupport();

test = {
    feature: 'csstransitions',
    test   : function(){
        var s = document.createElement('p').style, /*'s' for style. better to create an element if body yet to exist*/
            v = ['ms','O','Moz','Webkit'];         /*'v' for vendor*/

        if( s['transition'] == '' ) return true;   /*check first for prefeixed-free support*/
        while( v.length )                          /*now go over the list of vendor prefixes and check support until one is found*/
            if( v.pop() + 'Transition' in s )
                return true;
        return false;
    }
}

d.add(test)
d.detect();


