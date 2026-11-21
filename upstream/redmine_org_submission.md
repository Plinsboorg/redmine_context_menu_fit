Tracker: Defect (Patch attached)
Category: UI
Subject: Context menu submenus open off screen on narrow screens (mobile)
Related to: #5908

Steps to reproduce

1. Open the issue list on a phone (or a desktop browser with a viewport about 380px wide).
2. Long-press an issue row somewhere in the middle of the screen. The context menu opens.
3. Tap "Status" (or Tracker, Priority, ...).

Result: the submenu opens partly or completely off the left edge of the screen, and its entries can't be reached.
Expected: the submenu stays inside the viewport.

Cause

contextMenuShow() picks the submenu direction once, when the menu opens. It adds .reverse-x when `mouse_x + 2 * menu_width > window_width`. That check only looks at the room to the right of the click. It never checks whether the left side has room either. Only the main menu is kept on screen (`if (render_x <= 0) render_x = 1`).

On a 385px-wide viewport the main menu plus one submenu need about 300px side by side (more since #44071, because the menu can now grow wider). With the 6.1 widths, for any click between about x=85 and x=300 the menu is reversed and the submenu ends up at about x-298, partly or fully off screen. On current trunk this happens for nearly every click position. On desktop both sides have plenty of room, which is probably why #27779 could not be reproduced.

Fix

The attached patch adds contextMenuFitSubmenu(), bound to mouseenter on `#context-menu li.folder`. It runs on hover on desktop and on tap on touch devices. When a submenu opens, the function measures it with getBoundingClientRect(). Only if the submenu sticks out of the viewport does it move it:

* to the other side of the parent menu, if that side has room;
* otherwise against the viewport edge with more room, overlapping the parent menu (the way native mobile menus behave);
* and vertically back inside the viewport, if needed.

Submenus that already fit are not touched, so desktop behaviour doesn't change. The offsets are set as inline physical left/top values computed from the measured rects, so the fix doesn't depend on text direction.

That also fixes an RTL variant of the bug. The .reverse-x check assumes left-to-right, so with dir="rtl" submenus go off screen even on desktop, near the left edge of the window.

Tested on trunk (a20bf5cd) with headless Chromium, opening the menu at evenly spaced positions across the screen and opening the Status submenu by hover and by tap. The numbers show how many submenus ended up fully on screen:

| | before | after |
|---|---|---|
| LTR, 385x760 mobile | 2/38 | 38/38 |
| LTR, 1280x800 desktop | 40/40 | 40/40 (position unchanged) |
| RTL, 385x760 mobile | 22/38 | 38/38 |
| RTL, 1280x800 desktop | 30/40 | 40/40 |
