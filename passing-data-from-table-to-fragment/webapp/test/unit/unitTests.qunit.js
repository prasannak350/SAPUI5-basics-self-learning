/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapcom/passing-data-from-table-to-fragment/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
