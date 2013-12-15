window.ssmaps = window.ssmaps || [];
window.ssmaps.push(new (function(){

    // Some variables we'll use later
    var self = this;
    this.leafletLoaded = false;
    this.map;

    this.defaultOpts = {
        lat       : 0,
        lon       : 0,
        div       : 'ssmap_' + Math.floor(Math.random() * 5000),
        h         : '500px',
        w         : '500px',
        z         : 1,           // 1-18
        tiles     : 'sat',    // map (street) or sat
        mark      : true 
    };

    this.leafletJs = 'http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js?2';
    this.leafletCss = 'http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.css';

    
    // The code that actually makes the map on the page
    this.makeMap = function(){
        // We want to write this right away so we save our document position. We'll need it to get the parameters later after leaflet loads

        if(typeof self.opts === 'undefined'){
            this._setOpts();
        }

        // and the code that makes the div we're going into
        var targetDiv = document.getElementById(self.opts.div);
        if(!targetDiv){
            var targetDiv = document.createElement('div');
            targetDiv.id = self.opts.div;
            targetDiv.class = 'ssmap';
            targetDiv.style.width = self.opts.w;
            targetDiv.style.height = self.opts.h;

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(targetDiv);
        }

        if(!self.leafletLoaded){
            return self._loadLeaflet();
        }

        // All ready, make a map
        self.map = L.map(self.opts.div).setView([self.opts.lon,self.opts.lat],self.opts.z);

        new L.TileLayer('//{s}.mqcdn.com/tiles/1.0.0/' + self.opts.tiles + '/{z}/{x}/{y}.png', {
            maxZoom: 18, 
            attribution: 'Tiles from <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>',
            subdomains: (window.location.protocol == 'https' ? ['otile1-s','otile2-s','otile3-s','otile4-s'] : ['otile1','otile2','otile3','otile4'])
        }).addTo(self.map);

        if(self.opts.mark && self.opts.lon !== 0 && self.opts.lat !== 0){
            new L.Marker([self.opts.lon,self.opts.lat]).addTo(self.map);
        }

        return self.map;
    };

    // get the options from the URL of the script
    this._setOpts = function(){
        // Double check if we've got a different target
        self.opts = self.opts || self.defaultOpts;

        // We should be the last child since we're blocking the page load
        var script = document.getElementsByTagName('body')[0].lastChild;
        if(script.tagName === 'SCRIPT' && script.src.indexOf('?') !== -1){
            var optar;
            var optstrings = script.src.replace(/.*\?/,'').split('&')
            for(var i = 0;i<optstrings.length;i++){
                optar = optstrings[i].split('=');
                if(typeof self.opts[optar[0]] !== 'undefined'){
                    self.opts[optar[0]] = optar[1];
                }
            }
        }
    };

    // dynamically load Leaflet. Hope the user doesn't already use the letter L
    this._loadLeaflet = function(){
        var head = document.getElementsByTagName('head')[0];

        // If they defined another L, there might be trouble
        if(typeof L === 'undefined'){
            var o = document.createElement('link');
            o.rel = 'stylesheet';
            o.href = this.leafletCss;
            head.appendChild(o);

            var o = document.createElement('script');
            o.type = 'text/javascript';
            o.src = this.leafletJs;
            head.appendChild(o);

            this.readStateCheckInterval = setInterval(function(){
                if(document.readyState === 'complete'){
                    clearInterval(self.readStateCheckInterval);
                    self.leafletLoaded = true;
                    self.makeMap();
                }
            },10);
        } else {
            self.leafletLoaded = true;
            return this.makeMap();
        }
    };

    this.makeMap();
}));
