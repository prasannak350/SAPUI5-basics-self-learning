/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapcom/listbinding-from-odata/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
