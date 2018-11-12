(function() {
	 var PubSubTask = new PubSub();
	 var model = new taskModel(PubSubTask);
	 var view = new taskView(model,PubSubTask);
	 var  controller = new taskController(model,PubSubTask);
})();
		 
		