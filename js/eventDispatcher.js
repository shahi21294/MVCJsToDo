var Event = function (sender) {
    this.sender = sender;
    this.listeners = [];
}
Event.prototype = {
    fire: function (listener) {
        this.listeners.push(listener);
    },
    subscribe: function (args) {
        for (var i = 0; i < this.listeners.length; i++) {
            this.listeners[i](this.sender, args);
        }
    }
};