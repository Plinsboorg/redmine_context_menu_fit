# Context menu fit

Keeps the issue list's right-click (long-press) submenus (Status, Tracker,
Priority…) inside the viewport.

Core Redmine decides once, when the menu opens, whether submenus open to the
right or to the left (`.reverse-x`), and only keeps the main menu on screen.
On a phone (~380 px wide) the main menu and a submenu need ~300 px side by
side, so for most tap positions the submenu ends up partly off screen.

The plugin measures each submenu when it opens and moves it to the side that
fits. If neither side fits, it places it against the screen edge with more
room, overlapping the parent menu.

Upstream: https://www.redmine.org/issues/5908. The fix is submitted to core as
`contextMenuFitSubmenu()`. When core defines that function, this plugin does
nothing and can be removed.
