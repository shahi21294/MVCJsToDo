	
var taskController = function (model, view,pubSub) {
	this.model=model;
	this.view=view;
	this.pubSub=pubSub;
	this.init();
	controllerObjs=this;
};
	taskController.prototype = {
		init :function () {
			this.publishEvent();
		},
		publishEvent : function (taskName){
			this.pubSub.subscribe('addNewTask', this.addNewTask);
			this.pubSub.subscribe('selectTask', this.selectTask);
			this.pubSub.subscribe('unselectTask', this.unselectTask);
			this.pubSub.subscribe('deleteTask', this.deleteTask);
			this.pubSub.subscribe('loginUser', this.loginUser);
			this.pubSub.subscribe('logOutUser', this.logOutUser);
		},
		getUserID : function (userName,password){
			var taskFunc=this;
			var findUser = 0;
			taskFunc.model.users.forEach(function(user) {
			if(userName===user['userName'] && password===user['password'])
				   findUser = user['ID'];
			});
			if(findUser===0)
				return 0;
			else 
				return findUser;
		},
		selectTask: function (args) {
			controllerObjs.model.selectTask(args);
		},
		unselectTask: function (args) {
			controllerObjs.model.unselectTask(args);
		},
		deleteTask: function (args) {
			controllerObjs.model.deleteTask(args);
		},
		addNewTask: function (args) {
			controllerObjs.model.addNewTask(args);
		},
		loginUser : function (args) {
			var fields = args.split('-');
			if(fields[0] || fields[1]){
				if(controllerObjs.getUserID(fields[0],fields[1])!==0){
					controllerObjs.model.loginUser(controllerObjs.getUserID(fields[0],fields[1]));
				}else
					controllerObjs.view.errorMessage(1);
			}else{
					controllerObjs.view.errorMessage(1);
			}  
			
		},
		logOutUser : function (args) {
				controllerObjs.model.logOutUser();
		},
}