/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsap/crud_operations_odata/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
