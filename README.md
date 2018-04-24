Angular Y Drag - AngularJS vertical drag and drop
===================

![NgYDrag](https://github.com/khasky/NgYDrag/blob/master/screenshot.png)

[Live demo](http://khasky.com/demo/ng-y-drag)

## Features

 * No dependencies, jqLite only

## Callback functions

There are three callback functions, which you would use for extra features:

 * **ngYDragStart** - Calls when some item caught and mouse was moved
 * **ngYDragBefore** - Calls before changing items indexes (here you can return false, causing drop dragged item)
 * **ngYDragAfter** - Calls when mouse has been released

## Installation

 * Copy **ng-y-drag.min.css** from **dist** directory and include somewhere in your page
 * Copy **ng-y-drag.min.js** from **dist** directory and include it before your AngularJS app
 * Add angular module named **ngYDrag** to your AngularJS app

Check **demo** folder for usage examples.

## Build (optional)

If you want to modify and/or rebuild **NgYDrag**, you should install [NodeJS](https://nodejs.org) and run **grunt** in commandline.  

#### Used NodeJS modules

 * grunt-contrib-clean
 * grunt-contrib-uglify
 * grunt-contrib-cssmin
