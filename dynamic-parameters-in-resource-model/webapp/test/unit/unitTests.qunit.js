/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapcom/dynamic-parameters-in-resource-model/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
