
var TodoListCompositeView = Backbone.Marionette.CompositeView.extend({
  template : "#template-todoListCompositeView",
  itemView : TodoItemView,
  itemViewContainer : '#todo-list',

  ui : {
    toggle : '#toggle-all'
  },

  events : {
    'click #toggle-all' : 'onToggleAllClick'
  },

  initialize : function() {
    this.bindTo(this.collection, 'all', this.updateToggleCheckbox, this);
  },

  onRender : function() {
    this.updateToggleCheckbox();
  },

  updateToggleCheckbox : function() {
    function reduceCompleted(left, right) { return left && right.get('completed'); }
    var allCompleted = this.collection.reduce(reduceCompleted,true);
    this.ui.toggle.prop('checked', allCompleted);
  },

  onToggleAllClick : function(evt) {
    var isChecked = evt.currentTarget.checked;
    this.collection.each(function(todo){
      todo.save({'completed': isChecked});
    });
  }
});


