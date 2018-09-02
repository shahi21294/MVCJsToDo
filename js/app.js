
var model = Model();
var view = View();
var controller = Controller(view, model);
function showHide(type) {
				if(type=='all'){
					var element=document.getElementsByClassName("all")
						for (var i=0;i<element.length;i+=1){
						  element[i].style.display = 'table-row';
						}
				}else if (type=='complete'){
					var element=document.getElementsByClassName("all")
						for (var i=0;i<element.length;i+=1){
						  element[i].style.display = 'none';
						}
					var element=document.getElementsByClassName("complete")
						for (var i=0;i<element.length;i+=1){
						  element[i].style.display = 'table-row';
						}
				}else if (type=='active'){
					var element=document.getElementsByClassName("all")
						for (var i=0;i<element.length;i+=1){
						  element[i].style.display = 'none';
						}
					var element=document.getElementsByClassName("active")
						for (var i=0;i<element.length;i+=1){
						  element[i].style.display = 'table-row';
						}
				  }
			}