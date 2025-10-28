/*global QUnit*/

sap.ui.define([
	"sapcom/zproduct_proj/controller/ProductsData.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ProductsData Controller");

	QUnit.test("I should test the ProductsData controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
