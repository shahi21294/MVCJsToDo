var taskModel = function (pubSub) {
	this.todos = JSON.parse(localStorage.getItem('taskJson') || '[]');
	this.users=[{ ID:101, userName: "ali",password: "123456"},{ ID:102, userName: "reza",password: "123456"}];
	this.pubSub=pubSub;
	modelObj=this;
 };	
taskModel.prototype = {
	getCurrenttUser : function (){
		return localStorage.getItem('loginID');
	},
	getUserByID: function (){
		var findUser = 0;
		var taskFunc=this;
		this.users.forEach(function(user) {
			if(user['ID']==taskFunc.getCurrenttUser())
					findUser = user['userName'];
			}
		);
		if(findUser===0)
			return 0;
		else 
			return findUser;
	},
	getAllCurrentUserTasks :function(){
		var generateTask=[];
		var taskFunc=this;
		var getUserTask =  this.todos.filter(function(taskObject) {
			return taskObject.userID == taskFunc.getCurrenttUser();
		});
		for( var i = 0, len = getUserTask.length; i < len; i++ ){
			if(getUserTask[i].is_completed==='0')
				generateTask.push({taskID:getUserTask[i].ID,taskTitle:getUserTask[i].value,isComplete:false});
			else if(getUserTask[i].is_completed==='1')
				generateTask.push({taskID:getUserTask[i].ID,taskTitle:getUserTask[i].value,isComplete:true});
		}
		return generateTask;
	},
	getTaskByName : function (taskName) {
		for( var i = 0, len = this.todos.length; i < len; i++ ){
				 if(this.todos[i].value === taskName )
					 return i;
		}
	},
	getTaskByID : function (taskID) {
		
		for( var i = 0, len = this.todos.length; i < len; i++ ){
				 if(this.todos[i].ID == taskID ){
					 return i;
				 }
		}
		
	},
	getLastTaskID : function () {
		var maxTaskID=1;
		len = this.todos.length; 
		for( var i = 0; i < len; i++ ){
				 if(this.todos[i].ID >= maxTaskID ){
						maxTaskID=this.todos[i].ID+1;
						
				 }
		}
		return maxTaskID;
	},
	completeTask: function (taskID) {
		found = this.getTaskByID(taskID);
		this.todos[found].is_completed="1";
		localStorage.setItem("taskJson", JSON.stringify(this.todos));
		modelObj.pubSub.publish('doneTasksSetToComplete',taskID);
	},
	uncompleteTask: function (taskID) {
		found = this.getTaskByID(taskID);
		this.todos[found].is_completed="0";
		localStorage.setItem("taskJson", JSON.stringify(this.todos));
		modelObj.pubSub.publish('doneTasksSetToUnComplete',taskID);
	},
	addNewTask : function (taskTitle){
		var generateTaskForView=[];
		var taskID=modelObj.getLastTaskID();
		var userID=modelObj.getCurrenttUser();
		modelObj.todos.push({ID:taskID,userID:userID,value:taskTitle,is_completed: '0'});
		localStorage.setItem("taskJson", JSON.stringify(modelObj.todos));
		generateTaskForView.push({taskID:taskID,taskTitle:taskTitle});
		modelObj.pubSub.publish('doneAddNewTask',generateTaskForView);
	},
	deleteTask : function (taskID) {
		var found = this.getTaskByID(taskID);
		modelObj.todos.splice(found, 1);
		localStorage.setItem("taskJson", JSON.stringify(modelObj.todos));
		modelObj.pubSub.publish('doneDeleteTask',taskID);
	},
	loginUser : function (args) {
		localStorage.setItem("loginID", args);
		modelObj.pubSub.publish('doneUserState');
	},
	logOutUser : function () {
		localStorage.setItem("loginID", "null");
		modelObj.pubSub.publish('doneUserState');
	}
	
};
