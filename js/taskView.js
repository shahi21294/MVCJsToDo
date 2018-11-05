	var taskView=function(model){
		this.model=model;
		this.taskInput = document.querySelector("#addNewTask");
		this.allTaskButton = document.querySelector("#allTaskButton");
		this.completeTaskButton = document.querySelector("#completeTaskButton");
		this.activeTaskButton = document.querySelector("#activeTaskButton");
		this.loginUser = document.querySelector("#login");
		this.logoutUser = document.querySelector("#logout");
		this.eventJson=[];
	};	
	taskView.prototype = {
		init :function () {
				if (this.model.getUserByID()) {
					document.getElementById("loginShow").style.display = "none";
					document.getElementById("taskShow").style.display = "block";
					document.getElementById("userWelcome").innerHTML = this.model.getUserByID();
					this.addEventBinding(this.allTaskButton,"filterTaskAll","all");
					this.addEventBinding(this.completeTaskButton,"filterTaskComplete","complete");
					this.addEventBinding(this.activeTaskButton,"filterTaskActive","active");	
					this.addEventBinding(this.taskInput,"taskInput","");	
					this.addEventBinding(this.logoutUser,"logoutUser","");	
					this.destroyTask();
					this.generateTaskUI(this.model.getAllCurrentUserTasks());
				} else {
				   document.getElementById("loginShow").style.display = "block";
				   document.getElementById("taskShow").style.display = "none";
				   this.addEventBinding(this.loginUser,"loginUser","");	
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
			generateTaskUI : function (taskJson) {
				var taskFunc=this;
				taskJson.forEach(function(task) {
						var ulBody = document.getElementById('appendTask');
						var li=document.createElement("li");
						var checkBox=document.createElement("input");
						var label=document.createElement("label");
						var img=document.createElement("img");
						var taskName=document.createTextNode(task['taskTitle']);
						ulBody.appendChild(li);
						li.appendChild(checkBox);
						li.appendChild(label);
						li.appendChild(img);
						li.setAttribute("id", "taskRecord-"+task['taskID']);
						label.appendChild (taskName);
						taskFunc.addEventBinding(checkBox,"changeTaskStatus",task['taskID']);
						taskFunc.addEventBinding(img,"removeTaskRow",task['taskID']);
						checkBox.type="checkbox";
						img.className="removeTask";
						img.src="img/cross.png";
						if(task['isComplete']){
							checkBox.checked = true;
							li.className="all complete";
						}else{
							checkBox.checked = false;
							li.className="all active";
						}
					}
				)
			},
			getTaskRecordStatus : function(elementID) {
				var taskCheckBox = document.querySelector("#taskRecord-"+elementID+" input");
				if (taskCheckBox.checked == true){
					return true;
				} else {
					return false;
				}
			},
			addEventBinding : function(element,command,arguments) {
				this.eventJson.push({element:element,command: command,arguments : arguments});
			},
			getEventBinding : function(element,event,func,arguments) {
				return this.eventJson;
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
			showHideTaskByType : function (type,displayStyle) {
				var element=document.getElementsByClassName(type);
				for (var i=0;i<element.length;i+=1){
					element[i].style.display = displayStyle;
				}
			}
	}; 


 