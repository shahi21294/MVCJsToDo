var PubSub=function(){
    this.pubSub = {};
    this.topics = {};
    this.uid = 0;
}
PubSub.prototype = {
    subscribe : function(topic, callback) {
      if(!this.topics[topic])
        this.topics[topic] = [];
      var curUid = this.uid.toString();
      this.topics[topic].push({
        uid: curUid,
        callback: callback
      });
      this.uid++;
      return curUid;
    },
    publish : function(topic, args) {
      if(!this.topics[topic])
        return false;
      this.topics[topic].forEach(function(sub) {
        sub.callback(args);
      });
    }
 };