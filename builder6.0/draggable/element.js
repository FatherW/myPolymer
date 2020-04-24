
app.directive('draggable', function() {
  return function(scope, element, attrs) {
    // Get the native element
    var el = element[0];
    el.draggable = true; // Make dragable

    // Add event listeners
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('item_id', this.id);
        e.dataTransfer.setData('origin_id', el.parentElement.id);
        this.classList.add('dragging');
        return false;
      }, false
    );

    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('dragging');
        return false;
      },
      false
    );
  }
});