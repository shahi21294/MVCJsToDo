	
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
			this.model.todos.push({userID:this.model.getCurrenttUser(),value:taskName,is_completed: '0'});
			localStorage.setItem("taskJson", JSON.stringify(this.model.todos));
			this.view.clearTaskInput();
		},
		setupHandlers : function  (){
			var taskFunc=this;
			this.view.getEventBinding().forEach(function(elementEvent) {
				switch (elementEvent['command']){
					case "filterTaskAll" :
						elementEvent['element'].addEventListener("click", taskFunc.filterTask(elementEvent['arguments']));
					break;
					case "filterTaskComplete" :
						elementEvent['element'].addEventListener("click", taskFunc.filterTask(elementEvent['arguments']));
					break;
					case "filterTaskActive" :
						elementEvent['element'].addEventListener("click", taskFunc.filterTask(elementEvent['arguments']));
					break;
					case "changeTaskStatus" :
						elementEvent['element'].addEventListener("change", taskFunc.changeTaskStatus(elementEvent['arguments']));
					break;
					case "removeTaskRow" :
						elementEvent['element'].addEventListener("click", taskFunc.removeTask(elementEvent['arguments']));
					break;
					case "loginUser" :
						elementEvent['element'].addEventListener("click", taskFunc.login());
					break;
					case "logoutUser" :
						elementEvent['element'].addEventListener("click", taskFunc.logout());
					break;
					case "taskInput" : 
						elementEvent['element'].addEventListener('keydown', function(e) {
							if (e.which == 13 && e.target.selectionEnd > 0) {
								if(e.target.value.length > 0  ) {
									e.stopPropagation()
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
			var taskFunc=this;
			return function() {
				
				var fields = taskFunc.view.getUserNameAndPasswordInput().split('-');
				if(fields[0] || fields[1]){
					if(taskFunc.getUserID(fields[0],fields[1])!==0){
						localStorage.setItem("loginID", taskFunc.getUserID(fields[0],fields[1]));
						taskFunc.init();
					}else
						taskFunc.view.errorMessage(1);
				}else{
						taskFunc.view.errorMessage(1);
				}  
			}	
		},
		logout : function () {
			var taskFunc=this;
			return function() {			
				localStorage.setItem("loginID", "null");
				taskFunc.init();
			}
		},
		filterTask : function (type) {
			switch (type){
				case "all": 
					this.view.showHideTaskByType("all","block");
				break;
				case "complete" : 
					this.view.showHideTaskByType("all","none");
					this.view.showHideTaskByType("complete","block");
					
				break;
				case "active" :
					this.view.showHideTaskByType("all","none");
					this.view.showHideTaskByType("active","block");
				break;
			}
		},
		changeTaskStatus : function (toDoName) {
			var found='';
			var taskFunc=this;
			var modelTask=this.model;
			return function() {
					if (this.checked === true){
						found = modelTask.getTaskByName(toDoName);
						modelTask.todos[found].is_completed="1";
				} else if(this.checked === false) {
						found = modelTask.getTaskByName(toDoName);
						modelTask.todos[found].is_completed="0";
				}
				localStorage.setItem("taskJson", JSON.stringify(modelTask.todos));
				taskFunc.init();
			}
		},
		removeTask : function (toDoName) {
			var taskFunc=this;
			var modelTask=this.model;
			return function() {
				var found = modelTask.getTaskByName(toDoName);
				modelTask.todos.splice(found, 1);
				localStorage.setItem("taskJson", JSON.stringify(modelTask.todos));
				taskFunc.init();
			}
		}
}