var flex = (function() {
    var _flex = function(){};

    function resolveProp(panelName) {
        var words = panelName.split("-");
        if (words.length <= 0) return;

        var _prop = words[0];
        words.pop();

        for (var i=1, len=words.length; i<len; i++) {
            _prop += words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return _prop;
    }

    _flex.prototype.init = function(panel, prop) {
        if (!panel || !prop) return;

        var _panel = document.getElementById(panel);
        var _prop = document.getElementById(prop);
        var _buttons = _panel.getElementsByTagName("input");
        var property = resolveProp(panel)

        for (var i = 0, len=_buttons.length; i<len; i++) {
            _buttons[i].addEventListener("click", (function(target, name, value){
                return function() {
                    target.style[name] = value;
                }
            }(_prop, property, _buttons[i].value)), false);
        }
    }

    return _flex;
})();

window.onload = function() {
    new flex().init("flex-direction-panel", "flex-direction");
    new flex().init("flex-wrap-panel", "flex-wrap");
    new flex().init("justify-content-panel", "justify-content");
    new flex().init("align-items-panel", "align-items");
};
