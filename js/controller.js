var Controller = function (view, model) {
        var _view = view;
        var _model = model;
		document.getElementById('body').addEventListener('addItem', function(e) { 
           _model.addTodo( e.todo );
        });
		document.getElementById('body').addEventListener('deleteItem', function(e) { 
           _model.deleteTodo( e.index );
        });
        document.getElementById('body').addEventListener('updateView', function(e) { 
           _view.updateView( _model.getData() );
        });
};