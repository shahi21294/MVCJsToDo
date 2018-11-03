(function() {
	 var model = new taskModel();
	 var view = new taskView(model);
	 var  controller = new taskController(model, view);
})();
		 
		