app.directive('droppable', function() {
  return function(scope, element, attrs) {
    // Get the native element
    var el = element[0];

    // Add event listeners
    el.addEventListener(
      'dragover',
      function(e) {
        e.preventDefault(); // Allow the drop

        // Set effects
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('dragover');
        return false;
      }, false
    );

    el.addEventListener(
      'dragenter',
      function(e) {
        this.classList.add('dragover');
        return false;
      }, false
    );

    el.addEventListener(
      'dragleave',
      function(e) {
        this.classList.remove('dragover');
        return false;
      }, false
    );

    el.addEventListener(
      'drop',
      function(e) {
        this.classList.remove('dragover');

        // Get the data
        var destination = this.id;
        var item_to_move = e.dataTransfer.getData('item_id');
        var origin = e.dataTransfer.getData('origin_id');

        // Call the scope move function
        scope.MoveItem(origin, destination, item_to_move);

        return false;
      }, false
    );
  }
});