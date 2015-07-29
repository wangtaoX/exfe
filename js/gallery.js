var Gallery = (function() {
    var _interval = 2000;
    var _startIndex = 0;

    var G = function() {};
    G.prototype.init = function(selector, interval, startIndex) {
        if (!selector) return;

        var _gc = document.getElementById(selector);
        if (!_gc) return;

        this.gallery = _gc.getElementsByClassName("gallery")[0];
        this.galleryWall = this.gallery.getElementsByClassName("gallery-wall")[0];
        this.galleryPics = this.galleryWall.getElementsByTagName("ul")[0].getElementsByTagName("li");
        this.galleryNavs = this.galleryWall.getElementsByClassName("gallery-nav")[0].getElementsByTagName("li");
        if (!this.gallery || !this.galleryWall || !this.galleryPics || !this.galleryNavs) return;
        this.len = this.galleryPics.length;
        this.interval = interval || _interval;
        this.startIndex = startIndex - 1 || _startIndex;
        this.currentIndex = this.startIndex;
        this.timer = null;

        return this;
    };

    G.prototype.setT = function() {
        return window.setInterval((function(that){
            return function() {
                if (that.currentIndex > that.len - 1) that.currentIndex = 0;
                for(var i=0; i<that.len; i++) {
                    that.galleryPics[i].style.opacity = 0;
                }
                that.galleryPics[that.currentIndex].style.opacity = 1;
                for(var i=0; i<that.len; i++) {
                    that.galleryNavs[i].style.background = "rgba(250, 228, 255, .4)";
                    that.galleryNavs[i].style.backgroundClip = "padding-box";
                }
                that.galleryNavs[that.currentIndex].style.background = "rgba(250, 228, 255, .8)";
                that.currentIndex += 1;
            }
        })(this), this.interval);
    };

    G.prototype.start = function(){
        this.galleryPics[this.startIndex].style.opacity = 1;
        this.galleryNavs[this.startIndex].style.background = "rgba(250, 228, 255, .8)";

        //mouseover event
        for(var i=0; i<this.len; i++) {
            this.galleryNavs[i].addEventListener("mouseover", (function(that, index, window){
                return function() {
                    for(var i=0; i<that.len; i++) {
                        that.galleryPics[i].style.opacity = 0;
                    }
                    that.galleryPics[index].style.opacity = 1;
                    for(var i=0; i<that.len; i++) {
                        that.galleryNavs[i].style.background = "rgba(250, 228, 255, .4)";
                        that.galleryNavs[i].style.backgroundClip = "padding-box";
                    }
                    that.galleryNavs[index].style.background = "rgba(250, 228, 255, .8)";
                    that.currentIndex = index;
                    if (that.timer) {
                        window.clearInterval(that.timer);
                        that.timer = null;
                    }
                };
            })(this, i, window), false);
        }

        //mouseout event
        for(var i=0; i<this.len; i++) {
            this.galleryNavs[i].addEventListener("mouseout", (function(that){
                return function() {
                    if (!that.timer) that.timer = that.setT();
                };
            })(this), false);
        }

        this.timer = this.setT();
        return this;
    };

    G.prototype.stop = function(){};
    return G;
}());

window.onload = function() {
    var g = new Gallery().init("ga", 2000, 1).start();
};
