/*
 * Keeps context menu submenus inside the viewport.
 *
 * Core decides once, when the menu opens, whether submenus open to the right
 * or (with .reverse-x) to the left. On a narrow screen neither side may have
 * room, and the submenu ends up off screen. This measures the submenu when it
 * opens and moves it: to the other side if that fits, otherwise against the
 * screen edge with more room, overlapping the parent menu.
 */
(function() {
  var MARGIN = 2;

  function fitSubmenu() {
    var submenu = $(this).children('ul')[0];
    if (!submenu) return;

    submenu.style.left = submenu.style.right = '';
    submenu.style.top = submenu.style.bottom = '';
    var rect = submenu.getBoundingClientRect();
    if (rect.width === 0) return;

    var viewWidth = document.documentElement.clientWidth;
    var viewHeight = document.documentElement.clientHeight;

    if (rect.left < 0 || rect.right > viewWidth) {
      var parentRect = this.parentNode.getBoundingClientRect();
      var roomRight = viewWidth - parentRect.right;
      var roomLeft = parentRect.left;
      var left;
      if (roomRight >= rect.width) {
        left = parentRect.right;
      } else if (roomLeft >= rect.width) {
        left = parentRect.left - rect.width;
      } else if (roomRight >= roomLeft) {
        left = viewWidth - rect.width - MARGIN;
      } else {
        left = MARGIN;
      }
      left = Math.max(left, MARGIN);
      submenu.style.left = (submenu.offsetLeft + left - rect.left) + 'px';
      submenu.style.right = 'auto';
    }

    if (rect.top < 0 || rect.bottom > viewHeight) {
      var top = Math.max(Math.min(rect.top, viewHeight - rect.height - MARGIN), MARGIN);
      submenu.style.top = (submenu.offsetTop + top - rect.top) + 'px';
      submenu.style.bottom = 'auto';
    }
  }

  $(function() {
    // Core has its own fix (submitted upstream), so stay out of its way
    if (typeof window.contextMenuFitSubmenu === 'function') return;

    $(document).on('mouseenter', '#context-menu li.folder', fitSubmenu);
  });
})();
