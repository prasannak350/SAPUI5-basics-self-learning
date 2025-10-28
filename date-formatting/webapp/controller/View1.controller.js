sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/com/dateformatting/utils/formatter"
],
function (Controller, formatter) {
    "use strict";

    return Controller.extend("sap.com.dateformatting.controller.View1", {
        // pass formatter parameter details to formatter property
        customFormatter: formatter,
        onInit: function () {

        }
    });
});
