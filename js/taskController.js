	
var taskController = function (model, view) {
	this.model=model;
	this.view=view;
	this.init();
};
	taskController.prototype = {
		init :function () {
			this.setupHandlers();
			this.fireEvent();
		},
		setupHandlers : function  (){
			this.selectTaskHandler = this.selectTask.bind(this);
			this.unselectTaskHandler = this.unselectTask.bind(this);
			this.addTaskEventHandler = this.addNewTask.bind(this);
			this.deleteTaskHandler = this.deleteTask.bind(this);
			this.loginUserHandler = this.loginUser.bind(this);
			this.logOutUserHandler = this.logOutUser.bind(this);
		},
		fireEvent : function (taskName){
			this.view.selectTaskEvent.fire(this.selectTaskHandler);
			this.view.unselectTaskEvent.fire(this.unselectTaskHandler);
			this.view.addNewTaskEvent.fire(this.addTaskEventHandler);
			this.view.deleteTaskEvent.fire(this.deleteTaskHandler);
			this.view.loginUserEvent.fire(this.loginUserHandler);
			this.view.logOutUserEvent.fire(this.logOutUserHandler);
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
		selectTask: function (sender, args) {
			this.model.selectTask(args.taskID);
		},
		unselectTask: function (sender, args) {
			this.model.unselectTask(args.taskID);
		},
		deleteTask: function (sender, args) {
			this.model.deleteTask(args.taskID);
		},
		addNewTask: function (sender, args) {
			this.model.addNewTask(args.taskTitle);
		},
		loginUser : function (sender, args) {
			var fields = args.credential.split('-');
			if(fields[0] || fields[1]){
				if(this.getUserID(fields[0],fields[1])!==0){
					console.log(this.getUserID(fields[0],fields[1]));
					this.model.loginUser(this.getUserID(fields[0],fields[1]));
				}else
					this.view.errorMessage(1);
			}else{
					this.view.errorMessage(1);
			}  
			
		},
		logOutUser : function (sender, args) {
			console.log(args);
				this.model.logOutUser();
		},
}