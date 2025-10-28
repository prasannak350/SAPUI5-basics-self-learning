/*global QUnit*/

sap.ui.define([
	"comsap/crud_operations_odata/controller/PurchaseDetails.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PurchaseDetails Controller");

	QUnit.test("I should test the PurchaseDetails controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
