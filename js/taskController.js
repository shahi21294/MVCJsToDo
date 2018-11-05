	
var taskController = function (model, view) {
	this.model=model;
	this.view=view;
	this.init();
};
	taskController.prototype = {
		init :function () {
			this.view.init();
			this.setupHandlers();
		},
		createTask : function (taskName){
			this.model.todos.push({ID:this.model.getLastTaskID(),userID:this.model.getCurrenttUser(),value:taskName,is_completed: '0'});
			localStorage.setItem("taskJson", JSON.stringify(this.model.todos));
			this.view.clearTaskInput();
		},
		setupHandlers : function  (){
			var taskFunc=this;
			this.view.getEventBinding().forEach(function(elementEvent) {
				switch (elementEvent['command']){
					case "filterTaskAll" :
						elementEvent['element'].addEventListener("click", taskFunc.filterTask.bind(taskFunc.view, elementEvent['arguments']));
					break;
					case "filterTaskComplete" :
						elementEvent['element'].addEventListener("click", taskFunc.filterTask.bind(taskFunc.view, elementEvent['arguments']));
					break;
					case "filterTaskActive" :
						elementEvent['element'].addEventListener("click", taskFunc.filterTask.bind(taskFunc.view, elementEvent['arguments']));
					break;
					case "changeTaskStatus" :
						elementEvent['element'].addEventListener("change", taskFunc.changeTaskStatus.bind(taskFunc,elementEvent['arguments']));
					break;
					case "removeTaskRow" :
						elementEvent['element'].addEventListener("click", taskFunc.removeTask.bind(taskFunc,elementEvent['arguments']));
					break;
					case "loginUser" :
						elementEvent['element'].addEventListener("click", taskFunc.login.bind(taskFunc));
					break;
					case "logoutUser" :
						elementEvent['element'].addEventListener("click", taskFunc.logout.bind(taskFunc));
					break;
					case "taskInput" : 
						elementEvent['element'].addEventListener('keydown', function(e) {
							if (e.which == 13 && e.target.selectionEnd > 0) {
								if(e.target.value.length > 0  ) {
									
									taskFunc.createTask(e.target.value);
									taskFunc.init();
								}else{
									taskFunc.view.errorMessage(2);
								}        
							}
						});
						
					break;
				}
			});
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
		login : function () {
				var fields = this.view.getUserNameAndPasswordInput().split('-');
				if(fields[0] || fields[1]){
					if(this.getUserID(fields[0],fields[1])!==0){
						localStorage.setItem("loginID", this.getUserID(fields[0],fields[1]));
						this.init();
					}else
						this.view.errorMessage(1);
				}else{
						this.view.errorMessage(1);
				}  
		},
		logout : function () {
				localStorage.setItem("loginID", "null");
				this.init();
		},
		filterTask : function (type) {
			switch (type){
				case "all": 
					this.showHideTaskByType("all","block");
				break;
				case "complete" : 
					this.showHideTaskByType("all","none");
					this.showHideTaskByType("complete","block");
				break;
				case "active" :
					this.showHideTaskByType("all","none");
					this.showHideTaskByType("active","block");
				break;
			}
		},
		changeTaskStatus : function (taskID) {
			var found='';
			var modelTask=this.model;
			if (this.view.getTaskRecordStatus(taskID)){
					found = modelTask.getTaskByID(taskID);
					modelTask.todos[found].is_completed="1";
			} else {
					found = modelTask.getTaskByID(taskID);
					modelTask.todos[found].is_completed="0";
			}
			localStorage.setItem("taskJson", JSON.stringify(modelTask.todos));
			this.init();
		},
		removeTask : function (taskID) {
			var modelTask=this.model;
			var found = this.model.getTaskByID(taskID);
			this.model.todos.splice(found, 1);
			localStorage.setItem("taskJson", JSON.stringify(this.model.todos));
			this.init();
		}
}