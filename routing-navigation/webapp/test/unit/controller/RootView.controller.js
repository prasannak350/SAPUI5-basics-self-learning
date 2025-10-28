/*global QUnit*/

sap.ui.define([
	"sapcom/routing-navigation/controller/RootView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RootView Controller");

	QUnit.test("I should test the RootView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
