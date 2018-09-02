var View = function () {
	var updateView = function ( todos ) {
			var tBody = document.getElementById("appendTask");
			while (tBody.firstChild) {
				tBody.removeChild(tBody.firstChild);
			}
            for( var i = 0, len = todos.length; i < len; i++ ){
						var d1 = document.getElementById('appendTask');
						var newRow=document.createElement("tr");
						var newTdOne=document.createElement("td");
						var newTdTwo=document.createElement("td");
						var newTdThree=document.createElement("td");
						var checkBox=document.createElement("input");
						var a=document.createElement("a");
						var img=document.createElement("img");
						var spanOne=document.createElement("span");
						var spanTwo=document.createElement("span");
						var label=document.createElement("label");
						var taskName=document.createTextNode(todos[i]);
						d1.appendChild(newRow);
						newRow.appendChild(newTdOne);
						newTdOne.appendChild(label);
						label.appendChild(checkBox);
						label.appendChild(spanOne);
						newRow.appendChild(newTdTwo);
						newTdTwo.appendChild(spanTwo);
						spanTwo.appendChild (taskName);
						newRow.appendChild(newTdThree);
						newTdThree.appendChild(a);
						a.appendChild(img);
						checkBox.addEventListener("change", doneTask);
						a.addEventListener("click", removeTask);
						a.setAttribute('data-index',i);
						checkBox.type="checkbox";
						newRow.className="all active";
						a.className="removeTask";
						label.className="container";
						spanOne.className="checkmark";
						img.src="img/cross.png";
						document.getElementById("addTodo").value = "";
            }
			function removeTask(){
					var taskRow=this.parentNode.parentNode;
					var event = new Event('deleteItem');
					event.index = this.getAttribute('data-index');
					console.log(event);
					document.getElementById("body").dispatchEvent(event);
			}
			function doneTask() {
				var taskRow=this.parentNode.parentNode.parentNode;
				var span =taskRow.getElementsByTagName("span");
				if (this.checked == true){
						org_html = span[1].innerHTML;
						new_html = "<strike>" + org_html + "</strike>";
						span[1].innerHTML = new_html;
						taskRow.setAttribute("class", "all complete");
				
				} else {
						var strike =span[1].getElementsByTagName("strike");
						span[1].innerHTML = strike[0].innerHTML;
						taskRow.setAttribute("class", "all active");
				}
			}
	};
	var initView = function(){
		var elememnt = document.getElementById('addTodo');
		elememnt.addEventListener('keypress', function(e){
			var inputValue=document.getElementById("addTodo").value;
			if(e.which == 13){
				if(inputValue) {
					var event = new Event('addItem');
					event.todo = inputValue;
					document.getElementById("body").dispatchEvent(event);
					document.getElementById("addTodo").value = '';
				}else{
					alert("Invalid Task Name");
				}   
			}
		});
		
	};
	initView();
	return  {
		updateView: function (todos) {
                    updateView(todos);
		}
	};
};