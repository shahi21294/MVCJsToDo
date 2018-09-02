
var Model = function () {
    var _todos = new Array();     
	var notifyController = function () {	
			var event = new Event('updateView');
			document.getElementById("body").dispatchEvent(event);
	}
	return  {
			addTodo: function ( todo ) {
                    _todos.push(todo);
                    notifyController();
			},
			deleteTodo: function ( index ) {
                   _todos.splice(index,1);
                   notifyController();
			},
			getData: function(){
                    return _todos;
			}
		};
};
