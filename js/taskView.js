	var taskView=function(model,pubSub){
		this.model=model;
		this.pubSub=pubSub;

		this.taskInput = document.querySelector("#addNewTask");
		this.allTaskButton = document.querySelector("#allTaskButton");
		this.completeTaskButton = document.querySelector("#completeTaskButton");
		this.activeTaskButton = document.querySelector("#activeTaskButton");
		this.loginUserBtn = document.querySelector("#login");
		this.logOutUserBtn = document.querySelector("#logout");
		this.ulBody = document.querySelector('#appendTask');
		
		this.eventJson=[];
		this.init();
		viewObjs=this;
		
	};	
	taskView.prototype = {
		init :function () {
				if (this.model.getUserByID()) {
					document.getElementById("loginShow").style.display = "none";
					document.getElementById("taskShow").style.display = "block";
					document.getElementById("userWelcome").innerHTML = this.model.getUserByID();
					
					this.allTaskButton.addEventListener("click", this.filterTask.bind(this,"all"));					
					this.completeTaskButton.addEventListener("click", this.filterTask.bind(this,"complete"));
					this.activeTaskButton.addEventListener("click", this.filterTask.bind(this,"active"));
					
					
					this.generateTaskUI();
						
					this.subscribeEvent();
					
				} else {
				   document.getElementById("loginShow").style.display = "block";
				   document.getElementById("taskShow").style.display = "none";
					this.setupLogoutHandlers();	
					this.subscribeEvent();	
				}
			},
			clearTaskInput : function (){
				this.taskInput.value = "";
			},
			destroyTask : function (){
				var tBody = document.getElementById("appendTask");
				while (tBody.firstChild) {
					tBody.removeChild(tBody.firstChild);
				}
			},
			generateTaskUI : function () {
				this.destroyTask();
				var taskJson=this.model.getAllCurrentUserTasks()
				var taskFunc=this;
				taskJson.forEach(function(task) {
						if(task['isComplete']){
							taskChecked = "checked";
							taskLiclassName="all complete";
						}else{
							taskChecked = "";
							taskLiclassName="all active";
						}
						ulBodytaskHtml='<li class="'+taskLiclassName+'"><input id="taskRecord-'+task['taskID']+'"  class="taskRows" type="checkbox"'+ taskChecked+'><label>'+task['taskTitle']+'</label><img id="taskRecord-'+task['taskID']+'"  class="deleteTask" src="img/cross.png"></li>';
						taskFunc.ulBody.insertAdjacentHTML("beforeend",ulBodytaskHtml);
					}
				)
				this.setupHandlers();
			},
			getTaskRecordStatus : function(elementID) {
				var taskCheckBox = document.querySelector("#taskRecord-"+elementID+" input");
				if (taskCheckBox.checked == true){
					return true;
				} else {
					return false;
				}
			},
			setupHandlers: function () {
				var viewObj=this;

				var taskRowsCheckBox = document.querySelectorAll('.taskRows');
				for (var i = 0; i < taskRowsCheckBox.length; i++) {
					taskRowsCheckBox[i].addEventListener("change", this.selectOrUnselectTask.bind(this));
				}
				var taskRowsDelete = document.querySelectorAll('.deleteTask');
				for (var i = 0; i < taskRowsDelete.length; i++) {
					
					taskRowsDelete[i].addEventListener("click", this.deleteTask.bind(this));
				}
				this.taskInput.addEventListener('keydown', function(e) {
					if (e.which == 13 && e.target.selectionEnd > 0) {
						if(e.target.value.length > 0  ) {
							 viewObj.pubSub.publish('addNewTask', e.target.value);
						}else{
							viewObj.errorMessage(2);
						}        
					}
				});
				this.logOutUserBtn.addEventListener("click",this.logOutUser.bind(this));
			},
			setupLogoutHandlers: function () {
				this.loginUserBtn.addEventListener("click", this.loginUser.bind(this));
			},
			subscribeEvent : function (taskName){
				this.pubSub.subscribe('doneAddNewTask', this.doneAddNewTask);
				this.pubSub.subscribe('doneTasksChangeState', this.doneTasksChangeState);
				this.pubSub.subscribe('doneDeleteTask', this.doneDeleteTask);
				this.pubSub.subscribe('doneUserState', this.doneUserState);
			},
			selectOrUnselectTask: function () {
				var taskID = event.target.id.split("-");
				if (event.target.checked == true){
					viewObjs.pubSub.publish('selectTask', taskID[1]);
				} else {
					viewObjs.pubSub.publish('unselectTask', taskID[1]);
				}
			},
			deleteTask: function () {
				var taskID = event.target.id.split("-");
				viewObjs.pubSub.publish('deleteTask', taskID[1]);
			},
			doneDeleteTask: function () {
				viewObjs.generateTaskUI();
			},
			doneTasksChangeState: function () {
				viewObjs.generateTaskUI();
			},
			doneAddNewTask: function () {
				viewObjs.clearTaskInput();
				viewObjs.generateTaskUI();
			},
			loginUser: function () {
				viewObjs.pubSub.publish('loginUser', viewObjs.getUserNameAndPasswordInput());
			},
			logOutUser : function () {
				viewObjs.pubSub.publish('logOutUser');
			},
			doneUserState: function () {
				location.reload();
			},
			getUserNameAndPasswordInput : function (){
				var userName = document.getElementById('user').value;
				var password = document.getElementById('pass').value;
				return userName+'-'+password;
			},
			errorMessage : function (errorCode){
				if(errorCode){
					switch (errorCode){
						case 1: 
							alert("Invalid UserName and Password");
						break;
						case 2: 
							alert("Invalid Task Name");
						break;
					}
				}
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
			showHideTaskByType : function (type,displayStyle) {
				var element=document.getElementsByClassName(type);
				for (var i=0;i<element.length;i+=1){
					element[i].style.display = displayStyle;
				}
			}
	}; 


 